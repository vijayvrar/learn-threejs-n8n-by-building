import * as THREE from 'three';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
// Material
// ---------------------------------------------------

const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});

// ---------------------------------------------------
// Mesh
// ---------------------------------------------------

const cube = new THREE.Mesh(geometry, material);

// Add Cube to Scene
scene.add(cube);



// cube.position.x = 2;
// cube.position.y = 1;
// cube.position.z = -2;

// ---------------------------------------------------
// Rotate Cube (Lesson 04)
// ---------------------------------------------------

// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 4;


// cube.scale.x = 2;
// cube.scale.y = 2;
// cube.scale.z = 2;

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
    canvas: canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));



//const controls = new OrbitControls(camera, renderer.domElement);
//controls.enableDamping = true;


// Animation Loop


function animate() {

    // controls.update();

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