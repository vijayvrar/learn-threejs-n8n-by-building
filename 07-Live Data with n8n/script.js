import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const WEBHOOK_URL = "https://ai.tamilspacetech.com/webhook/iss-live";

// ----------------------------------------------------
// Scene
// ----------------------------------------------------

const canvas = document.querySelector(".webgl");

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

const spaceTexture = textureLoader.load("./assets/textures/space.jpg");

spaceTexture.mapping = THREE.EquirectangularReflectionMapping;

scene.background = spaceTexture;
scene.environment = spaceTexture;

// ----------------------------------------------------
// Satellite
// ----------------------------------------------------

const gltfLoader = new GLTFLoader();

let satellite;

gltfLoader.load(
    "./assets/models/satellite.glb",

    (gltf) => {

        satellite = gltf.scene;

        satellite.scale.set(0.3, 0.3, 0.3);

        scene.add(satellite);

    }
);

// ----------------------------------------------------
// Lights
// ----------------------------------------------------

scene.add(new THREE.AmbientLight(0xffffff, 1.5));

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);

directionalLight.position.set(3, 3, 3);

scene.add(directionalLight);

// ----------------------------------------------------
// Camera
// ----------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 3;

scene.add(camera);

// ----------------------------------------------------
// Renderer
// ----------------------------------------------------

const renderer = new THREE.WebGLRenderer({

    canvas,

    antialias: true

});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ----------------------------------------------------
// Controls
// ----------------------------------------------------

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;

// ----------------------------------------------------
// Resize
// ----------------------------------------------------

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});

// ----------------------------------------------------
// Animation
// ----------------------------------------------------

function animate() {

    requestAnimationFrame(animate);

    controls.update();

    if (satellite) {

satellite.rotation.x += 0.0005;
satellite.position.y = Math.sin(Date.now()*0.001)*0.05;
    }

    renderer.render(scene, camera);

}

animate();

// ----------------------------------------------------
// Telemetry
// ----------------------------------------------------

const telemetryBtn = document.getElementById("telemetryBtn");

const panel = document.getElementById("telemetryPanel");

let timer = null;

async function getTelemetry() {

    try {

        const response = await fetch(

            `${WEBHOOK_URL}?t=${Date.now()}`

        );

        const data = await response.json();

        panel.innerHTML = `
            <h2>🛰 ISS (International Space Station)</h2>

            <p><strong>Latitude:</strong> ${data.latitude.toFixed(4)}°</p>

            <p><strong>Longitude:</strong> ${data.longitude.toFixed(4)}°</p>

            <p><strong>Altitude:</strong> ${data.altitude.toFixed(2)} km</p>

            <p><strong>Velocity:</strong> ${Math.round(data.velocity)} km/h</p>

            <p><strong>Updated:</strong> ${data.updated ?? "Live"}</p>
        `;

    }

    catch (err) {

        console.error(err);

        panel.innerHTML = "<p>Unable to fetch telemetry.</p>";

    }

}

// ----------------------------------------------------
// Button
// ----------------------------------------------------

telemetryBtn.addEventListener("click", () => {

    getTelemetry();

    if (!timer) {

        timer = setInterval(getTelemetry, 5000);

    }

});