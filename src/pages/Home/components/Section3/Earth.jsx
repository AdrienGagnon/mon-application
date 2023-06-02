import * as THREE from 'three';

import { useRef, useEffect } from 'react';

import mapDayEarth from '../../assets/2k_earth_daymap.jpg';
import mapNormalEarth from '../../assets/2k_earth_normal_map.jpg';

function RotatingEarth() {
    const earthRef = useRef(null);

    useEffect(() => {
        const container = earthRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.setZ(30);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: earthRef.current.children[0],
            alpha: true,
        });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        const directLight = new THREE.SpotLight(0xffffff, 5);

        directLight.position.set(50, 50, 50);
        directLight.penumbra = 1;
        directLight.decay = 2;
        directLight.distance = 200;
        directLight.castShadow = true;

        const earthTexture = new THREE.TextureLoader().load(mapDayEarth);
        const normalTexture = new THREE.TextureLoader().load(mapNormalEarth);

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(15, 32, 32),
            new THREE.MeshStandardMaterial({
                map: earthTexture,
                normalMap: normalTexture,
            })
        );
        sphere.castShadow = true;
        directLight.target = sphere;

        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.render(scene, camera);

        function onContainerResize() {
            const box = container.getBoundingClientRect();
            renderer.setSize(box.width, box.height);

            camera.aspect = box.width / box.height;
            camera.updateProjectionMatrix();
        }

        let counter = 0;

        function animate() {
            requestAnimationFrame(animate);
            counter += 0.005;
            sphere.rotation.y += 0.005;
            sphere.rotation.x = Math.sin(counter) / 2;
            renderer.render(scene, camera);
        }

        const resizeEarth = () => {
            const width = container.offsetWidth;
            const height = container.offsetHeight;

            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.onresize = resizeEarth;
        window.addEventListener('resize', resizeEarth());
        container.addEventListener('resize', onContainerResize);

        scene.add(ambientLight);
        scene.add(directLight);
        scene.add(sphere);

        animate();
    }, []);

    return (
        <div id="earth-div" ref={earthRef}>
            <canvas id="earth-svg">Rotating earth</canvas>
        </div>
    );
}

export default RotatingEarth;
