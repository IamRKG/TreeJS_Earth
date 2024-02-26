import * as THREE from "three";

import color from "nice-color-palettes";


function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}
const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera();

const renderer = new THREE.WebGLRenderer();

renderer.setClearColor("#ccc", 1.5);

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

for (let i = 0; i < 40; i++) {
  let material = new THREE.MeshBasicMaterial({ color: color.flat()[i] });
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh.position.set(getRandomInt(-1, 1), getRandomInt(-1, 1), getRandomInt(-1, 1));
  mesh.scale.set(getRandomInt(-1, 1), getRandomInt(-1, 1), getRandomInt(-1, 1));
  mesh.scale.multiplyScalar(0.5);
  camera.position.z = 5;
}


const aspect = window.innerHeight / window.innerWidth;

// Ortho zoom
const zoom = 1.0;

// Bounds
camera.left = -zoom * aspect;
camera.right = zoom * aspect;
camera.top = zoom;
camera.bottom = -zoom;

// Near/Far
camera.near = -100;
camera.far = 100;

// Set position & look at world center
camera.position.set(zoom, zoom, zoom);
camera.lookAt(new THREE.Vector3());

// Update the camera
camera.updateProjectionMatrix();

function animate() {
  requestAnimationFrame(animate);
  scene.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animate();
