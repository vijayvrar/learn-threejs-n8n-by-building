import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ----------------------------------------------------
// n8n Webhook
// ----------------------------------------------------

const WEBHOOK_URL = "your webhook url";


// ----------------------------------------------------
// Scene
// ----------------------------------------------------

const canvas = document.querySelector(".webgl");

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();


// ----------------------------------------------------
// Space Background
// ----------------------------------------------------

// ----------------------------------------------------
// Space Background
// ----------------------------------------------------

scene.background = new THREE.Color(0x000008);


// Create stars

const starGeometry = new THREE.BufferGeometry();

const starCount = 2000;

const starPositions = [];

for (let i = 0; i < starCount; i++) {

    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;

    starPositions.push(x, y, z);
}

starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        starPositions,
        3
    )
);

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08
});

const stars = new THREE.Points(
    starGeometry,
    starMaterial
);

scene.add(stars);

// ----------------------------------------------------
// Earth
// ----------------------------------------------------

const earthTexture = textureLoader.load(
    "./assets/textures/earth.jpg"
);

const earthGeometry = new THREE.SphereGeometry(
    1,
    64,
    64
);

const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture
});

const earth = new THREE.Mesh(
    earthGeometry,
    earthMaterial
);

scene.add(earth);


// ----------------------------------------------------
// Satellite
// ----------------------------------------------------

const gltfLoader = new GLTFLoader();

let satellite;

gltfLoader.load(
    "./assets/models/satellite.glb",

    (gltf) => {

        satellite = gltf.scene;

        satellite.scale.set(
            0.08,
            0.08,
            0.08
        );

        scene.add(satellite);

    }
);


// ----------------------------------------------------
// Lights
// ----------------------------------------------------

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.5
);

scene.add(ambientLight);


const directionalLight =
    new THREE.DirectionalLight(
        0xffffff,
        3
    );

directionalLight.position.set(
    5,
    3,
    5
);

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

camera.position.set(
    0,
    1,
    4
);

scene.add(camera);


// ----------------------------------------------------
// Renderer
// ----------------------------------------------------

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


// ----------------------------------------------------
// Orbit Controls
// ----------------------------------------------------

const controls =
    new OrbitControls(
        camera,
        canvas
    );

controls.enableDamping = true;


// ----------------------------------------------------
// Resize
// ----------------------------------------------------

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);


// ----------------------------------------------------
// Satellite Orbit
// ----------------------------------------------------

let orbitAngle = 0;

const orbitRadius = 2.2;


// ----------------------------------------------------
// Animation
// ----------------------------------------------------

function animate() {

    requestAnimationFrame(animate);

    controls.update();


    // Rotate Earth
    earth.rotation.y += 0.001;


    // Orbit satellite around Earth
    if (satellite) {

        orbitAngle += 0.003;


        // Circular orbit
satellite.position.x =
    Math.cos(orbitAngle) * orbitRadius;

satellite.position.z =
    Math.sin(orbitAngle) * orbitRadius;

satellite.position.y =
    Math.sin(orbitAngle) * 0.5;


        // Rotate satellite itself
       // satellite.rotation.y += 0.002;

    }


    renderer.render(
        scene,
        camera
    );

}

animate();


// ----------------------------------------------------
// Telemetry
// ----------------------------------------------------

const telemetryBtn =
    document.getElementById(
        "telemetryBtn"
    );

const panel =
    document.getElementById(
        "telemetryPanel"
    );

let timer = null;


// ----------------------------------------------------
// Fetch ISS Telemetry from n8n
// ----------------------------------------------------

async function getTelemetry() {

    try {

        const response =
            await fetch(
                `${WEBHOOK_URL}?t=${Date.now()}`
            );


        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        const data =
            await response.json();


        panel.innerHTML = `

            <h2>
                🛰 ISS
                (International Space Station)
            </h2>

            <p>
                <strong>Latitude:</strong>
                ${Number(data.latitude).toFixed(4)}°
            </p>

            <p>
                <strong>Longitude:</strong>
                ${Number(data.longitude).toFixed(4)}°
            </p>

            <p>
                <strong>Altitude:</strong>
                ${Number(data.altitude).toFixed(2)} km
            </p>

            <p>
                <strong>Velocity:</strong>
                ${Math.round(
                    Number(data.velocity)
                )} km/h
            </p>

            <p>
                <strong>Updated:</strong>
                ${data.updated ?? "Live"}
            </p>

        `;

    }

    catch (err) {

        console.error(err);

        panel.innerHTML =
            "<p>Unable to fetch telemetry.</p>";

    }

}


// ----------------------------------------------------
// Start Live Telemetry Button
// ----------------------------------------------------

telemetryBtn.addEventListener(
    "click",
    () => {

        getTelemetry();


        if (!timer) {

            timer =
                setInterval(
                    getTelemetry,
                    5000
                );

        }

    }
);
