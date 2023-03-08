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

// Check on which sections current state
const section1 = document.getElementById('section1');
const section3 = document.getElementById('section3');
const header = document.getElementById('header');
const section2 = document.getElementById('section2');
const section4 = document.getElementById('section4');

const headerState = ['header', false];
const section2State = ['section2', false];
const section4State = ['section4', false];

const changeOtherState = function (entries) {
    const [entry] = entries;
    const activeOther = `${entry.target.id}`;
    if (activeOther === 'header') {
        headerState[1] = !entry.isIntersecting ? false : true;
        document
            .getElementById('section1')
            .classList.remove('section--hidden-up');
    }
    if (activeOther === 'section2') {
        section2State[1] = !entry.isIntersecting ? false : true;
    }
    if (activeOther === 'section4') {
        section4State[1] = !entry.isIntersecting ? false : true;
    }
};

const sectionObserverOther = new IntersectionObserver(changeOtherState, {
    root: null,
    threshold: 0.2,
});

const observeOther = function (sections) {
    sections.forEach(section => {
        sectionObserverOther.observe(section);
    });
};

observeOther([header, section2, section4]);

// Sliding sections 1 and 3
const revealSection = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden-down');
    const el1 = entry.target.querySelector('.layer1');
    const el2 = entry.target.querySelector('.layer2');
    if (
        headerState[1] ||
        (section2State[1] && entry.target.id === 'section3')
    ) {
        el1.classList.add('anim-slide-1');
        el2.classList.add('anim-slide-2');
    }
    if (
        section4State[1] ||
        (section2State[1] && entry.target.id === 'section1')
    ) {
        el1.classList.add('anim-slide-3');
        el2.classList.add('anim-slide-4');
    }
    entry.target.classList.remove('section--hidden-up');
};

const hideSection = function (entries) {
    const [entry] = entries;
    if (entry.isIntersecting) return;
    if (entry.target.id === 'section1') {
        entry.target.classList.add(
            `section--hidden-${headerState[1] ? 'down' : 'up'}`
        );
        entry.target
            .querySelector('.layer1')
            .classList.remove('anim-slide-1', 'anim-slide-3');
        entry.target
            .querySelector('.layer2')
            .classList.remove('anim-slide-2', 'anim-slide-4');
    } else {
        entry.target.classList.add(
            `section--hidden-${section2State[1] ? 'down' : 'up'}`
        );
        entry.target
            .querySelector('.layer1')
            .classList.remove('anim-slide-1', 'anim-slide-3');
        entry.target
            .querySelector('.layer2')
            .classList.remove('anim-slide-2', 'anim-slide-4');
    }
};

// Call the revealSection function when intersecting
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
});
const sectionObserverOut = new IntersectionObserver(hideSection, {
    root: null,
    threshold: 0.1,
});

// Adding the hidden class to the sections
const observeSection1 = function (section) {
    sectionObserver.observe(section);
    sectionObserverOut.observe(section);

    section.classList.add(`section--hidden-${headerState[1] ? 'down' : 'up'}`);
};
const observeSection3 = function (section) {
    sectionObserver.observe(section);
    sectionObserverOut.observe(section);
    section.classList.add(
        `section--hidden-${section2State[1] ? 'down' : 'up'}`
    );
};

observeSection1(section1);
observeSection3(section3);
