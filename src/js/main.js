// import { revealSection } from './script';

// let currentPage = mainPage;
// const allPages = document.querySelectorAll('.page');

// const observer = new IntersectionObserver(entries => {
//     if (FileSystemEntry.isIntersecting) {
//         console.log('allo');
//     }
// });

import * as THREE from '../../node_modules/three/build/three.module.js';
// import { Renderer } from 'three';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#earth-svg'),
    alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(15, 32, 32);
const material = new THREE.MeshStandardMaterial({
    color: 'blue',
});

const color = 0xffffff;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);

const earthTexture = new THREE.TextureLoader().load(
    '../src/img/2k_earth_daymap.jpg'
);
const normalTexture = new THREE.TextureLoader().load(
    '../src/img/2k_earth_normal_map.jpg'
);
const sphere = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: normalTexture,
    })
);

let counter = 0;

function animate() {
    requestAnimationFrame(animate);
    counter += 0.005;
    sphere.rotation.y += 0.002;
    sphere.rotation.x = Math.sin(counter) / 2;
    renderer.render(scene, camera);
}

scene.add(light);
scene.add(sphere);
animate();
