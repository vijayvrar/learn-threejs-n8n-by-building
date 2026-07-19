import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ---------------------------------------------------
// Canvas
// ---------------------------------------------------

const canvas = document.querySelector('.webgl');

// ---------------------------------------------------
// Scene
// ---------------------------------------------------

const scene = new THREE.Scene();

// ---------------------------------------------------
// Texture Loader
// ---------------------------------------------------

const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load(
    '../assets/textures/earth.jpg'
);

const metalTexture = textureLoader.load(
    '../assets/textures/metal.jpg'
);

 const woodTexture = textureLoader.load(
     '../assets/textures/wood.jpeg'
 );

 const starfieldTexture = textureLoader.load(
    '../assets/textures/space.jpg'
);

scene.background = starfieldTexture;

// ---------------------------------------------------
// GLTF Loader
// ---------------------------------------------------
let satellite;
const gltfLoader = new GLTFLoader();
// ---------------------------------------------------
// Load Satellite
// ---------------------------------------------------

gltfLoader.load(
    '../assets/models/satellite.glb',

    (gltf) => {

        satellite = gltf.scene;

        satellite.scale.set(0.2, 0.2, 0.2);

        scene.add(satellite);

    }
);
const ambientLight = new THREE.AmbientLight(0xffffff, 3);

scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);

directionalLight.position.set(5, 5, 5);

scene.add(directionalLight);


// ---------------------------------------------------
// Camera
// ---------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 3;

scene.add(camera);


// ---------------------------------------------------
// Renderer
// ---------------------------------------------------

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ---------------------------------------------------
// Orbit Controls
// ---------------------------------------------------

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ---------------------------------------------------
// Animation Loop
// ---------------------------------------------------

function animate() {

    if (satellite) {

    satellite.rotation.y += 0.005;

}

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(animate);

}

animate();

// ---------------------------------------------------
// Resize
// ---------------------------------------------------

window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

});