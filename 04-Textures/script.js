import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

// ---------------------------------------------------
// Geometry
// ---------------------------------------------------

const geometry = new THREE.BoxGeometry(1, 1, 1);

// ---------------------------------------------------
// Materials
// ---------------------------------------------------


// Earth Texture
const material = new THREE.MeshBasicMaterial({
    map: earthTexture
});



// Metal Texture
const material1 = new THREE.MeshBasicMaterial({
     map: metalTexture
 });

// Wood Texture
const material2 = new THREE.MeshBasicMaterial({
    map: woodTexture
});


// ---------------------------------------------------
// Mesh
// ---------------------------------------------------

const cube = new THREE.Mesh(geometry, material2);

scene.add(cube);

// ---------------------------------------------------
// Sphere
// ---------------------------------------------------

const sphereGeometry = new THREE.SphereGeometry(
    0.75,   
    32,     
    32      
);

const sphere = new THREE.Mesh(sphereGeometry, material);

scene.add(sphere);
cube.position.x = -1.5;
sphere.position.x = 1.5;

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
// Lights
// ---------------------------------------------------

// const ambientLight = new THREE.AmbientLight(
//     0xffffff,
//     1
// );

// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(
//     0xffffff,
//     2
// );

// directionalLight.position.set(2, 2, 3);

// scene.add(directionalLight);

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