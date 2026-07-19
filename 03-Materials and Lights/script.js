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
// Geometry
// ---------------------------------------------------

const geometry = new THREE.BoxGeometry(1, 1, 1);

// ---------------------------------------------------
// Materials
// ---------------------------------------------------

// Basic Material
const material = new THREE.MeshBasicMaterial({
color: 0x00ff00
});

// Normal Material
// const material = new THREE.MeshNormalMaterial();

// Standard Material
//const material = new THREE.MeshStandardMaterial({
  //   color: 0x00ff00
 //});

// Wireframe Material
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true
// });

// ---------------------------------------------------
// Mesh
// ---------------------------------------------------

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);


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