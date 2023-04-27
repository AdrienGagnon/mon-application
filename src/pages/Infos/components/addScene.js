import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import pianoMtl from '../assets/models/piano.mtl';
import pianoObj from '../assets/models/piano.obj';
import volantMtl from '../assets/models/volant.mtl';
import volantObj from '../assets/models/volant.obj';
import tapisTexture from '../assets/texture-tapis-rouge.jpg';

function createScene() {
    // Create scene
    const scene = new THREE.Scene();

    /////////////////////////
    // Shaders

    const fragmentShader = `  uniform float time;
    uniform float playhead;
    uniform sampler2D texture1;
    uniform vec4 resolution;
    uniform vec3 colors[5];
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    float PI = 3.141592653589793238;
    
    float aastep(float threshold, float value) {
      #ifdef GL_OES_standard_derivatives
        float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
        return smoothstep(threshold-afwidth, threshold+afwidth, value);
      #else
        return step(threshold, value);
      #endif
    }
    
    float maskline(float p, float index) {
        float i1 = aastep(p, index/5.) - aastep(p, (index-1.)/5.);
        return i1;
    }
    
    vec3 getColor(float i) {
        vec3 c1 = colors[0]*maskline(i,1.);
        vec3 c2 = colors[1]*maskline(i,2.);
        vec3 c3 = colors[2]*maskline(i,3.);
        vec3 c4 = colors[3]*maskline(i,4.);
        vec3 c5 = colors[4]*maskline(i,5.);
        return c1+c2+c3+c4+c5;
    }
    
    mat4 rotationMatrix(vec3 axis, float angle) {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;
    
        return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                    0.0,                                0.0,                                0.0,                                1.0);
    }
    
    vec3 rotate(vec3 v, vec3 axis, float angle) {
      mat4 m = rotationMatrix(axis, angle);
      return (m * vec4(v, 1.0)).xyz;
    }
    
    
    void main()	{
      // vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    
    
        vec3 n = rotate(vNormal, vec3(0.,1.,0.), -playhead*2.*PI);
        float mask = maskline(vUv.y, 0.);
    
        float diff = clamp(dot(vec3(1.),n),0.,1.);
    
      gl_FragColor = vec4(vPosition,1.);
      gl_FragColor = vec4(vUv.y,0.,0.,1.);
        gl_FragColor = mask * vec4(colors[0],1.);
        gl_FragColor = vec4(getColor(vUv.y),1.);
        gl_FragColor = vec4(getColor(fract(vUv.y*3. - playhead))+0.5*vec3(diff),1.);
        // gl_FragColor = vec4(n,1.);
        // gl_FragColor = vec4(getColor(fract(vUv.x*30.)),1.);
        // gl_FragColor = vec4(diff,diff,diff,1.);
    }`;

    const vertexShader = `  uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform vec2 pixels;
    float PI = 3.141592653589793238;
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
    
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`;

    /* --color-pillar-1: rgb(240, 230, 140);
    --color-pillar-2: rgb(255, 215, 0);
    --color-pillar-3: rgb(255, 165, 0);
    --color-pillar-4: rgb(210, 105, 30);
    --color-pillar-5: rgb(160, 82, 45);
     */
    const colors = [
        'rgb(240, 230, 140)',
        'rgb(255, 215, 0)',
        'rgb(255, 165, 0)',
        'rgb(210, 105, 30)',
        'rgb(160, 82, 45)',
    ];

    let threecolors = colors.map(color => new THREE.Color(color));

    const body = document.getElementById('body-infos');

    class Sketch {
        light;
        ///////////////////////////////
        // contructor
        constructor(options, row, position, scene) {
            // constant
            this.counterLoading = 0;
            this.time = 0;
            this.isPlaying = true;
            this.duration = 2;
            this.fps = 60;
            this.step = 1 / (this.fps * this.duration) / 2;
            this.playhead = 0;
            this.row = row;
            this.position = position;

            // scene
            this.scene = scene;
            this.scene.position.y = 0.4;

            // renderer
            this.group = new THREE.Group();
            this.groupPiano = new THREE.Group();
            this.childrenEl = [];
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(this.width, this.height);
            this.renderer.setClearColor(0x000000, 1);
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // container
            this.container = options.dom;
            this.width = body.offsetWidth;
            this.height = body.offsetHeight;

            // this.width = this.container.offsetWidth;
            // this.height = this.container.offsetHeight;
            this.container.appendChild(this.renderer.domElement);

            // camera
            this.camera = new THREE.PerspectiveCamera(
                50,
                this.width / this.height,
                0.01,
                100
            );
            this.setCamera();

            this.controls = new OrbitControls(
                this.camera,
                this.renderer.domElement
            );
            // resize
            this.resize();
            this.setupResize();

            // add object
            this.importPiano();
            this.importVolant();

            this.addObjects(-10, -20);
            this.addObjects(10, -20);
            this.addObjects(-10, -40);
            this.addObjects(10, -40);
            this.addObjects(-10, -60);
            this.addObjects(10, -60);
            this.addObjects(-10, -80);
            this.addObjects(10, -80);

            // scroll
            this.listenOnScroll();

            // Add plane
            this.addPlane();
            this.addCircleSupport();
            this.addCarpet();
            this.addLight();
        }
        ///////////////////////////////

        // Set camera
        setCamera() {
            this.camera.position.set(0, 0, 0);
            this.camera.lookAt(0, 0, -100);
        }

        // Add light
        addLight() {
            const ambientLight = new THREE.AmbientLight('white', 0.01);

            this.light = new THREE.SpotLight(0xffffff, 5);
            this.light.position.set(0, 20, -20);
            this.light.angle = Math.PI / 6;
            this.light.penumbra = 1;
            this.light.decay = 2;
            this.light.distance = 100;
            this.light.castShadow = true;

            this.light.castShadow = true;
            this.light.shadow.mapSize.width = 1024;
            this.light.shadow.mapSize.height = 1024;
            this.light.shadow.camera.near = 10;
            this.light.shadow.camera.far = 200;
            this.light.shadow.focus = 1;

            this.groupPiano.add(this.light);
            this.groupPiano.add(ambientLight);
            this.groupPiano.add(this.light.target);
            this.light.target.position.z = -20;
            this.counterLoading++;
            this.finishingLoading();
        }

        finishingLoading() {
            if (this.counterLoading <= 20) return;
            const loader = document.querySelector('.loading-screen');
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.classList.add('displayNone');
            }, 1000);
        }

        ///////////////////////////////
        // resize
        resize() {
            this.width = body.offsetWidth;
            this.height = body.offsetHeight;
            this.renderer.setSize(this.width, this.height);
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
        }

        setupResize() {
            window.addEventListener('resize', this.resize.bind(this));
        }
        // end of resize
        ///////////////////////////////

        ///////////////////////////////
        // render
        render() {
            if (!this.isPlaying) return;
            this.time += this.step;
            this.playhead = (this.time % 10) / 10;
            this.material.uniforms.playhead.value = this.playhead;
            this.childrenEl.forEach(element => {
                if (element.geometry?.type === 'CylinderGeometry') return;
                element.rotation.y = this.playhead * 2 * Math.PI;
            });
            requestAnimationFrame(this.render.bind(this));
            this.renderer.render(this.scene, this.camera);
        }
        // end of renderer
        ///////////////////////////////

        ///////////////////////////////
        // add objects
        addObjects(positionX, positionZ) {
            this.material = new THREE.ShaderMaterial({
                extensions: {
                    derivatives:
                        '#extension GL_OES_standard_derivatives : enable',
                },
                side: THREE.DoubleSide,
                uniforms: {
                    time: { type: 'f', value: 0 },
                    playhead: { type: 'f', value: 0 },
                    colors: { type: 'fv1', value: threecolors },
                },
                // wireframe: true,
                // transparent: true,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
            });

            let number = 150;
            let points = [];
            for (let i = 0; i < number; i++) {
                let p = i / number;

                let x = 1 * Math.sin(p * 60);
                let y = p * 30;
                let z = 1 * Math.cos(p * 60);

                points.push(new THREE.Vector3(x, y, z));
            }

            let curve = new THREE.CatmullRomCurve3(points);
            let geometry = new THREE.TubeGeometry(curve, 500, 0.08, 50, false);

            const mesh = new THREE.Mesh(geometry, this.material);
            mesh.position.y = -5.5;

            mesh.position.z = positionZ;
            mesh.position.x = positionX;
            this.group.add(mesh);
            // this.scene.add(mesh);
            this.addPillar(mesh.position.x, mesh.position.z);
            this.scene.add(this.group);
            this.render();
            this.childrenEl = this.group.children;
            this.counterLoading++;
            this.finishingLoading();
        }

        addPiano(object) {
            object.position.z = -100;
            object.position.y = -2;
            object.rotation.y = -Math.PI / 2;
            object.scale.set(2, 2, 2);
            object.receiveShadow = true;
            object.castShadow = true;
            object.children[0].castShadow = true;

            this.groupPiano.add(object);
            this.counterLoading++;
            this.finishingLoading();
        }

        importPiano() {
            const mtlLoader = new MTLLoader();

            const path = pianoObj;
            const pathmtl = pianoMtl;

            mtlLoader.load(
                pathmtl,
                function (materials) {
                    materials.preload();

                    const objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load(
                        path,
                        this.addPiano.bind(this),
                        function (xhr) {
                            (xhr.loaded / xhr.total) * 100 + '% loaded';
                        }
                    );
                }.bind(this)
            );
        }

        addVolant(volant) {
            volant.receiveShadow = true;
            volant.castShadow = true;

            volant.position.x = -80;
            volant.position.y = 0.2;
            volant.position.z = -82;

            volant.rotation.y = -(3 * Math.PI) / 4;
            volant.rotation.z = -1;

            volant.scale.set(0.5, 0.5, 0.5);

            volant.children[0].castShadow = true;

            this.groupPiano.add(volant);
            this.scene.add(this.groupPiano);
            this.counterLoading++;
            this.finishingLoading();
        }

        importVolant() {
            const mtlLoader = new MTLLoader();
            const path = volantObj;
            const pathmtl = volantMtl;
            mtlLoader.load(
                pathmtl,
                function (materials) {
                    materials.preload();

                    const objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load(
                        path,
                        this.addVolant.bind(this),
                        function (xhr) {
                            (xhr.loaded / xhr.total) * 100 + '% loaded';
                        }
                    );
                }.bind(this)
            );
        }

        addPillar(positionX, positionZ) {
            const geometryPillar = new THREE.CylinderGeometry(1, 1, 60, 8);

            const cylinder = new THREE.Mesh(
                geometryPillar,
                new THREE.MeshPhongMaterial({
                    color: '#ffa500',
                })
            );
            cylinder.position.x = positionX;
            cylinder.position.z = positionZ;
            cylinder.rotation.y = 8;
            cylinder.castShadow = true;
            this.group.add(cylinder);
            this.counterLoading++;
            this.finishingLoading();
        }

        addPlane() {
            const geometry = new THREE.PlaneGeometry(100, 500);
            const material = new THREE.MeshPhongMaterial({
                color: 'rgb(22, 22, 22)',
                side: THREE.DoubleSide,
            });
            const plane = new THREE.Mesh(geometry, material);
            plane.rotateX(Math.PI / 2);
            plane.translateZ(3);
            plane.receiveShadow = true;
            this.scene.add(plane);
            this.counterLoading++;
            this.finishingLoading();
        }

        addCarpet() {
            const path = tapisTexture;
            const carpetTexture = new THREE.TextureLoader().load(
                path,

                // onLoad callback
                function (texture) {
                    const geometry = new THREE.PlaneGeometry(10, 105);
                    const material = new THREE.MeshPhongMaterial({
                        color: 'rgb(44, 2, 2)',
                        side: THREE.DoubleSide,
                        map: texture,
                    });
                    const carpet = new THREE.Mesh(geometry, material);
                    carpet.rotateX(Math.PI / 2);
                    carpet.translateZ(2.9);
                    carpet.translateY(-50);
                    carpet.receiveShadow = true;
                    this.scene.add(carpet);
                    this.counterLoading++;
                    this.finishingLoading();
                }.bind(this),

                // onProgress callback currently not supported
                undefined
            );
        }

        addCircleSupport() {
            const geometry = new THREE.CylinderGeometry(5, 5, 0.8, 32);
            const material = new THREE.MeshPhongMaterial({
                color: 'rgb(44, 2, 2)',
                side: THREE.DoubleSide,
            });
            const cylinder = new THREE.Mesh(geometry, material);
            cylinder.translateZ(-100);
            cylinder.translateY(-2.5);
            cylinder.receiveShadow = true;
            this.scene.add(cylinder);
            this.counterLoading++;
            this.finishingLoading();
        }

        listenOnScroll() {
            const container = document.querySelector('.container-infos');
            container.addEventListener('scroll', this.moveOnScroll.bind(this));
        }

        moveOnScroll() {
            const container = document.querySelector('.container-infos');
            // Donne le pourcentage de scroll: de offSet a 1
            const pourcentageOffSet =
                (container.scrollTop + container.clientHeight) /
                container.scrollHeight;
            const offSet = container.clientHeight / container.scrollHeight;

            // Donne le pourcentage de scroll: de 0 a 1
            const pourcentage = (pourcentageOffSet - offSet) / (1 - offSet);
            const movement = -95 * pourcentage;

            // rotation du piano
            // this.groupPiano.children[3].rotation.y =
            //     -(Math.PI * (1 - pourcentage)) / 2;
            if (movement <= -75 && movement >= -95) {
                this.groupPiano.children[3].rotation.y =
                    -(Math.PI * (1 + (75 + movement) / 20)) / 2;
            }

            // movement du volant
            if (movement <= -40 && movement >= -100) {
                this.groupPiano.children[4].position.x =
                    -50 + -(40 + movement) * 1.6;
                // roation
                this.groupPiano.children[4].rotation.z =
                    (Math.PI * -(40 + movement)) / 10;
            }

            if (movement <= -80) {
                this.camera.position.set(0, 0 - (movement + 80) / 5, movement);
                this.camera.lookAt(0, 0 + (movement + 80) / 5, -100);
            } else {
                this.camera.lookAt(0, 0, -100);
                this.camera.position.set(0, 0, 0 + movement);
                this.light.position.set(0, 20, -20 + movement);
                this.light.target.position.z = -20 + movement;
            }
        }
    }
    new Sketch(
        {
            dom: document.getElementById('body-infos'),
        },
        1,
        1,
        scene
    );
}

export default createScene;
