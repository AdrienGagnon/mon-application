import * as THREE from 'three';
import { gsap, Expo } from 'gsap';
import { ImageLoader } from 'three';
import imgArrowFull from '../img/menu-principal/up-arrow-full.png';
import imgArrowEmpty from '../img/menu-principal/up-arrow-full.png';
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

// const earthTexture = new THREE.TextureLoader().load(
//     '../src/img/2k_earth_daymap.jpg'
// );
const image = new ImageLoader('../img/2k_earth_daymap.jpg');

const earthTexture = new THREE.TextureLoader().load(
    '../src/img/2k_earth_normal_map.jpg',
    function (obj) {
        console.log(obj);
    },
    function (obj) {
        console.log(obj);
    }
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
    sphere.rotation.y += 0.005;
    sphere.rotation.x = Math.sin(counter) / 2;
    renderer.render(scene, camera);
}

const earthDiv = document.querySelector('#earth-div');
const resizeEarth = function () {
    const width = earthDiv.offsetWidth;
    const height = earthDiv.offsetHeight;
    // this.width = this.container.offsetWidth;
    // this.height = this.container.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

const setupResize = () => {
    window.addEventListener('resize', resizeEarth());
};

setupResize();
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
const toTop = document.querySelector('.revenirTop');

const toTopImage = document.querySelector('.toTop');

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

toTop.addEventListener('click', function (e) {
    header.scrollIntoView({
        behavior: 'smooth',
    });
});

///////////////////////////////////////////////////
// Click on plateformes icons

const githubIcon = document.getElementById('github-icon');
const linkedInIcon = document.getElementById('linkedin-icon');
const emailIcon = document.getElementById('email-icon');

function goTo(e) {
    console.log(e);
    if (e.target.id === 'github-icon') {
    }
}

for (icon of [githubIcon, linkedInIcon, emailIcon]) {
    console.log('yepo');
    icon.addEventListener('click', e => goTo(e));
}
