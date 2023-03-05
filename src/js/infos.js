import * as THREE from '../../node_modules/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.117.0/examples/jsm/controls/OrbitControls.js';

// spinning spirals info page

// import { Renderer } from 'three';
const addpillar = function () {
    const camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGL1Renderer({
        canvas: document.querySelector('#spirals-svg'),
        alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    renderer.render(scene, camera);

    const geometry = new THREE.CylinderBufferGeometry(15, 15, 50, 8);

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);

    const pillarTexture = new THREE.TextureLoader().load(
        '../src/img/gold-texture.jpg'
    );

    const cylinder = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
            map: pillarTexture,
        })
    );

    function animate() {
        requestAnimationFrame(animate);
        cylinder.rotation.y += 0.002;
        renderer.render(scene, camera);
    }

    animate();
    scene.add(light);
    scene.add(cylinder);
};

/////////////////////////

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

class Sketch {
    ///////////////////////////////
    // contructor
    constructor(options) {
        // constant
        this.time = 0;
        this.isPlaying = true;
        this.duration = 2;
        this.fps = 60;
        this.step = 1 / (this.fps * this.duration);
        this.playhead = 0;

        // scene
        this.scene = new THREE.Scene();
        this.scene.position.y = 0.4;

        // renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // container
        this.container = options.dom;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.container.appendChild(this.renderer.domElement);

        // camera
        this.camera = new THREE.PerspectiveCamera(
            50,
            this.width / this.height,
            0.01,
            100
        );
        this.camera.position.set(0, -2, -10);

        // controls
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        // resize
        this.resize();
        this.setupResize();

        // add object
        this.addObjects();

        // render
        this.render();

        // Add plane
        this.addPlane();

        // debug GUI
        // this.settings();
    }
    // end of contructor
    ///////////////////////////////

    ///////////////////////////////
    // resize
    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
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
    // animation control
    stop() {
        this.isPlaying = false;
    }

    play() {
        if (!this.isPlaying) {
            this.renderer();
            this.isPlaying = true;
        }
    }
    // end of animation control
    ///////////////////////////////

    ///////////////////////////////
    // render
    render() {
        if (!this.isPlaying) return;
        this.time += this.step;
        this.playhead = this.time % 1;

        this.material.uniforms.playhead.value = this.playhead;
        this.mesh.rotation.y = this.playhead * 2 * Math.PI;
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
    // end of renderer
    ///////////////////////////////

    ///////////////////////////////
    // debug GUI
    settings() {
        this.settings = { progress: 0 };
        this.gui = new dat.GUI();
        this.gui.add(this.settings, 'progress', 0, 1, 0.01);
    }
    // end of debug gui
    ///////////////////////////////

    ///////////////////////////////
    // add objects
    addObjects() {
        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable',
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
            let y = p * 10;
            let z = 1 * Math.cos(p * 60);

            points.push(new THREE.Vector3(x, y, z));
        }

        let curve = new THREE.CatmullRomCurve3(points);
        let geometry = new THREE.TubeBufferGeometry(
            curve,
            400,
            0.08,
            50,
            false
        );

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.position.y = -2;
        this.scene.add(this.mesh);
    }

    addPlane() {
        const geometry = new THREE.PlaneBufferGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial({
            color: 'rgb(116, 116, 116)',
            side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(geometry, material);
        this.scene.add(plane);
        console.log(this.camera);
        this.scene.background = new THREE.Color('black');
    }
}

new Sketch({
    dom: document.getElementById('container-infos'),
});
