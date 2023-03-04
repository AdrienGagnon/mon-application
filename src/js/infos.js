// spinning spirals info page

import * as THREE from '../../node_modules/three/build/three.module.js';
// import { Renderer } from 'three';
const scene = new THREE.Scene();

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

const geometry = new THREE.CylinderGeometry(15, 15, 50, 8);

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

/////////////////////////

import { OrbitControls } from 'https://unpkg.com/three@0.117.0/examples/jsm/controls/OrbitControls.js';

const colors = ['#351330', '#424254', '#64908a', '#e8caa4', '#cc2a41'];

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
        this.camera.position.set(0, 0, -3);

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
        });

        let number = 100;
        let points = [];
        for (let i = 0; i < number; i++) {
            let p = i / number;

            let x = p * Math.sin(p * 60);
            let y = p * 4;
            let z = p * Math.cos(p * 60);

            points.push(new THREE.Vector3(x, y, z));
        }

        let curve = new THREE.CatmullRomCurve3(points);
        let geometry = new THREE.TubeBufferGeometry(curve, 400, 0.1, 50, false);

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.position.y = -2;
        this.scene.add(this.mesh);
    }
}

new Sketch({
    dom: document.getElementById('container-infos'),
});

////////////////

scene.add(light);
// scene.add(cylinder);
animate();
