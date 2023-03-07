import * as THREE from '../../node_modules/three/build/three.module.js';
// import { Renderer } from 'three';
import { gsap, Expo } from 'https://cdn.skypack.dev/gsap@3.7.1';
const scene = new THREE.Scene();
const container = document.querySelector('#earth-div');

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
renderer.setSize(container.offsetWidth, container.offsetHeight);

container.addEventListener('resize', onContainerResize);

function onContainerResize() {
    const box = container.getBoundingClientRect();
    console.log(box);
    renderer.setSize(box.width, box.height);

    camera.aspect = box.width / box.height;
    camera.updateProjectionMatrix();
    // optional animate/renderloop call put here for render-on-changes
}
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.setZ(40);

renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(15, 32, 32);

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

//////////////////////////////////
// Mouse blob
/* gsap.set('.ball', { xPercent: -50, yPercent: -50 });

const ball = document.querySelector('.ball');
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.2;

const xSet = gsap.quickSetter(ball, 'x', 'px');
const ySet = gsap.quickSetter(ball, 'y', 'px');

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

gsap.ticker.add(() => {
    // adjust speed for higher refresh monitors
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
});
 */
gsap.set('.ball', { xPercent: -50, yPercent: -50 });

const ball = document.querySelector('.ball');
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.35;

const xSet = gsap.quickSetter(ball, 'x', 'px');
const ySet = gsap.quickSetter(ball, 'y', 'px');

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

gsap.ticker.add(() => {
    // adjust speed for higher refresh monitors
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
});

/////////////////////////
// Sliding in sections

const section1 = document.getElementById('section1');
const section3 = document.getElementById('section3');

const revealSection = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);
    if (
        !entry.isIntersecting &&
        !entry.target.classList.contains('section--hidden-down')
    ) {
        console.log('ici');
        entry.target.classList.add('section--hidden-up');
        observeDown(
            `section${entry.target.id.slice(-1)}` === 1 ? section1 : section3
        );
    }
    if (
        !entry.isIntersecting &&
        !entry.target.classList.contains('section--hidden-up')
    ) {
        console.log('ici');
        entry.target.classList.add('section--hidden-down');
        observeUp(
            `section${entry.target.id.slice(-1)}` === 1 ? section1 : section3
        );
    }
    if (entry.isIntersecting) {
        console.log('la');
        if (entry.target.classList.contains('section--hidden-down')) {
            observeDown(entry.target.id.slice(-1) === 1 ? section1 : section3);
        } else {
            observeUp(entry.target.id.slice(-1) === 1 ? section1 : section3);
        }

        entry.target.classList.remove('section--hidden-down');
        entry.target.classList.remove('section--hidden-up');
    }
};

// Call the revealSection function when intersecting
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
});

// Adding the hidden class to the sections
const observeDown = function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden-down');
    console.log(section.classList);
};

const observeUp = function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden-up');
    console.log(section.classList);
};

observeDown(section1);
observeDown(section3);
