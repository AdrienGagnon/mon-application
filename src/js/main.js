import * as THREE from 'three';
import { gsap, Expo } from 'gsap';
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
    sphere.rotation.y += 0.005;
    sphere.rotation.x = Math.sin(counter) / 2;
    renderer.render(scene, camera);
}

const section3 = document.querySelector('#section3');
const resizeEarth = function () {
    const width = section3.offsetWidth / 2;
    const height = section3.offsetHeight / 2;
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

// Check on which sections current state

const section1Top = document.querySelector('.section1-top-shape');
const section1Bottom = document.querySelector('.section1-bottom-shape');
const section3Top = document.querySelector('.section3-top-shape');
const section3Bottom = document.querySelector('.section3-bottom-shape');

// Sliding sections 1 and 3
const slidingShapes = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        entry.target.classList.add('section--hidden');
        sectionObserver.observe(entry.target);
    } else {
        entry.target.classList.remove('section--hidden');
        sectionObserver.observe(entry.target);
    }
};

// Call the revealSection function when intersecting
const sectionObserver = new IntersectionObserver(slidingShapes, {
    root: null,
    threshold: 0.5,
});

// Adding the hidden class to the sections
const observeSection = function (sections) {
    sections.forEach(section => {
        section.classList.add('section--hidden');
        sectionObserver.observe(section);
    });
};

observeSection([section1Top, section1Bottom, section3Top, section3Bottom]);

///////////////////////////////////////////////////
// Scrolling to sections
const toInfos = document.querySelector('.to-section-infos');
const toPhotos = document.querySelector('.to-section-photos');
const toQuiz = document.querySelector('.to-section-quiz');
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

toTop.addEventListener('click', function (e) {
    header.scrollIntoView({
        behavior: 'smooth',
    });
});
