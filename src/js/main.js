import * as THREE from 'three';
import { gsap } from 'gsap';

import { goToGithub, goToLinkedIn, sendEmail } from './general';

goToGithub();
goToLinkedIn();
sendEmail();

// Rotating earth
const scene = new THREE.Scene();
const container = document.querySelector('#earth-div');

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.setZ(30);

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#earth-svg'),
    alpha: true,
});

const geometry = new THREE.SphereGeometry(15, 32, 32);

const color = 0xffffff;
const intensity = 0.1;
const ambientLight = new THREE.AmbientLight(color, intensity);
const directLight = new THREE.SpotLight(0xffffff, 5);

directLight.position.set(50, 50, 50);
directLight.penumbra = 1;
directLight.decay = 2;
directLight.distance = 200;
directLight.castShadow = true;

const path = require('../img/menu-principal/2k_earth_daymap.jpg');
const pathTexture = require('../img/menu-principal/2k_earth_normal_map.jpg');

const earthTexture = new THREE.TextureLoader().load(path);

const normalTexture = new THREE.TextureLoader().load(pathTexture);

const sphere = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: normalTexture,
    })
);
directLight.target = sphere;
sphere.castShadow = true;

renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

function onContainerResize() {
    const box = container.getBoundingClientRect();
    renderer.setSize(box.width, box.height);

    camera.aspect = box.width / box.height;
    camera.updateProjectionMatrix();
}
container.addEventListener('resize', onContainerResize);

let counter = 0;

function animate() {
    requestAnimationFrame(animate);
    counter += 0.005;
    sphere.rotation.y += 0.005;
    sphere.rotation.x = Math.sin(counter) / 2;
    renderer.render(scene, camera);
}

const earthDiv = document.querySelector('#earth-div');

const resizeEarth = function () {
    const width = earthDiv.offsetWidth;
    const height = earthDiv.offsetHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};
window.onresize = resizeEarth;
window.addEventListener('resize', resizeEarth());

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(directLight, sphereSize);
scene.add(pointLightHelper);

scene.add(ambientLight);
scene.add(directLight);
scene.add(sphere);
animate();

//////////////////////////////////
// Mouse blob

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

const sectionBottom = document.querySelectorAll('.section-bottom');
const sectionTop = document.querySelectorAll('.section-top');

// Sliding sections 1 and 3
const slidingShapes = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        const shapeSVG = entry.target.querySelectorAll('.shape');
        shapeSVG.forEach(el => el.classList.add('section--hidden'));
    } else {
        const shapeSVG = entry.target.querySelectorAll('.shape');
        shapeSVG.forEach(el => el.classList.remove('section--hidden'));
    }
};

// Call the revealSection function when intersecting
const sectionObserver = new IntersectionObserver(slidingShapes, {
    root: null,
    threshold: 0.5,
});

// Adding the hidden class to the sections
const observeSection = function (sections) {
    const allSections = [
        sections[0][0],
        sections[0][1],
        sections[1][0],
        sections[1][1],
    ];
    allSections.forEach(section => {
        const shapeSVG = section.querySelectorAll('.shape');
        shapeSVG.forEach(el => el.classList.add('section--hidden'));
        sectionObserver.observe(section);
    });
};

observeSection([sectionBottom, sectionTop]);

///////////////////////////////////////////////////
// Scrolling to sections
const toInfos = document.querySelector('.to-section-infos');
const toPhotos = document.querySelector('.to-section-photos');
const toQuiz = document.querySelector('.to-section-quiz');
const toContact = document.querySelector('.to-section-contact');
const toTop = document.querySelector('.revenirTop');

toInfos.addEventListener('click', function (e) {
    section1.scrollIntoView({
        behavior: 'smooth',
    });
});

toPhotos.addEventListener('click', function (e) {
    section2.scrollIntoView({
        behavior: 'smooth',
    });
});

toQuiz.addEventListener('click', function (e) {
    section3.scrollIntoView({
        behavior: 'smooth',
    });
});

toContact.addEventListener('click', function (e) {
    section4.scrollIntoView({
        behavior: 'smooth',
    });
});

toTop.addEventListener('click', function (e) {
    header.scrollIntoView({
        behavior: 'smooth',
    });
});

///////////////////////////////////////////////////
// Click on plateformes icons

const githubIcon = document.getElementById('go-to-github-logo');
const linkedInIcon = document.getElementById('go-to-linkedin-logo');
const emailIcon = document.getElementById('send-email-logo');

function goTo(e) {
    if (e.target.id === 'github-icon') {
    }
}

for (const icon of [githubIcon, linkedInIcon, emailIcon]) {
    icon.addEventListener('click', e => goTo(e));
}

/////////////////////////////////////////////
// Lazy load image welcome

// Remove blur: only when loading is done
const imageLecco = document.getElementById('welcome-img-lecco');
const newImg = new Image();

newImg.onload = function () {
    imageLecco.src = this.src;
};

newImg.src = '../img/menu-principal/lecco-adrien.jpg';
