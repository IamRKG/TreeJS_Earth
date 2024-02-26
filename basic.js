import * as THREE from "three";

import color from "nice-color-palettes";



function randomNumber(min = 0, max = 100) {

  // find diff
  let difference = max - min;

  // generate random number 
  let rand = Math.random();

  // multiply with difference 
  rand = Math.floor( rand * difference);

  // add with min value 
  rand = rand + min;

  return rand;
}

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera();

const renderer = new THREE.WebGLRenderer();

renderer.setClearColor("#ccc", 1.5);

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

let cube

for (let i = 0; i < 40; i++) {
  cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: color.flat()[i] })
  );

  cube.position.set(
    randomNumber(-1, 1),
    randomNumber(-1, 1),
    randomNumber(-1, 1)
  );

  cube.scale.set(
    randomNumber(-1, 1),
    randomNumber(-1, 1),
    randomNumber(-1, 1)
  );
  //cube.scale.set(randomNumber(-1, 1),randomNumber(-1, 1), randomNumber(-1, 1));
  cube.scale.multiplyScalar(0.1);
  scene.add(cube);
  camera.position.z = 5;
}

const ambient = new THREE.AmbientLight("blue");
const light = new THREE.DirectionalLight("white", 1);

light.position.set(0, 0, 4);

scene.add(ambient);
scene.add(light);

// Update the camera
function animate() {
  requestAnimationFrame(animate);
  const aspect = window.innerWidth / window.innerHeight;
  

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
  
  //let time = Date.now() * 0.001;
  //scene.rotation.y = time;
  //scene.rotation.z = time;
  //let clock =  new THREE.Clock()
  //scene.rotation.x += clock.getDelta() * 0.1;
  scene.rotation.z += 0.01
  
  camera.lookAt(new THREE.Vector3());
    
 
  camera.updateProjectionMatrix();
 
  renderer.render(scene, camera);
  
}
animate();
