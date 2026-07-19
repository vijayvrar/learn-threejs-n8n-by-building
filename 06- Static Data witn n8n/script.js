import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('./assets/textures/earth.jpg');

const metalTexture = textureLoader.load('./assets/textures/metal.jpg');

const woodTexture = textureLoader.load('./assets/textures/wood.jpeg');

const spaceTexture = textureLoader.load('./assets/textures/space.jpg');
spaceTexture.mapping = THREE.EquirectangularReflectionMapping;

scene.background = spaceTexture;
scene.environment = spaceTexture;


const gltfLoader = new GLTFLoader();
let satellite;
gltfLoader.load(
    './assets/models/satellite.glb',

    (gltf) => {

        satellite = gltf.scene;

        satellite.scale.set(0.3, 0.3, 0.3);

        satellite.position.set(0, 0, 0);

        scene.add(satellite);

    }
);


// Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);

// Materials
const sphereMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    metalness: 0.2,
    roughness: 0.8
});

const boxMaterial = new THREE.MeshStandardMaterial({
    map: metalTexture,
    metalness: 1,
    roughness: 0.2
});

const cylinderMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture,
    metalness: 0,
    roughness: 0.9
});

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(3, 3, 3);

scene.add(directionalLight);

// Meshes
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

// Position
sphere.position.x = -2.5;
cube.position.x = 0;
cylinder.position.x = 2.5;

// Add to Scene
//scene.add(sphere);
//scene.add(cube);
//scene.add(cylinder);



// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 3;

scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// Render Scene

function animate() {
    requestAnimationFrame(animate);
    controls.update();

if (satellite) {
    satellite.rotation.y += 0.005;
}

sphere.rotation.x += 0.01;
sphere.rotation.y += 0.01;

cube.rotation.x += 0.01;
cube.rotation.y += 0.01;

cylinder.rotation.x += 0.01;
cylinder.rotation.y += 0.01;

    renderer.render(scene, camera);
}



const telemetryBtn = document.getElementById("telemetryBtn");
const panel = document.getElementById("telemetryPanel");

telemetryBtn.addEventListener("click", async () => {

    const response = await fetch(
        "https://ai.tamilspacetech.com/webhook/satellite-status"
    );

    const data = await response.json();

    console.log(data);

    panel.innerHTML = `
        <h3>${data.satellite}</h3>
        <p>Status: ${data.status}</p>
        <p>Battery: ${data.battery}</p>
        <p>Temperature: ${data.temperature}</p>
    `;

});

animate();