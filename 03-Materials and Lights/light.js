// ---------------------------------------------------
// Ambient Light
// ---------------------------------------------------

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(ambientLight);

// ---------------------------------------------------
// Directional Light
// ---------------------------------------------------

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

directionalLight.position.set(2, 2, 3);

scene.add(directionalLight);