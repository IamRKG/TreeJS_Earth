import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

const scene = new THREE.Scene();
//scene.add(new THREE.AxesHelper(5))
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(10, 5, 20);
camera.lookAt(new THREE.Vector3());


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update()

const sphere = new THREE.SphereGeometry(1, 16, 16);

const texture = new THREE.TextureLoader()
const earth = texture.load("earth.jpg");
const moon = texture.load("moon.jpg");

const basicMaterial = new THREE.MeshStandardMaterial({
  roughness:1,
  metalness:0,
  map: earth
});

const basicMaterialMoon = new THREE.MeshStandardMaterial({
  roughness:1,
  metalness:0,
  map: moon
});
const mesh = new THREE.Mesh(sphere, basicMaterial);
scene.add(mesh);

const moonGroup =  new THREE.Group()
const moonMesh = new THREE.Mesh(sphere, basicMaterialMoon);
moonMesh.position.set(1.5, 1, 0);
moonMesh.scale.setScalar(0.25);
moonGroup.add(moonMesh)
scene.add(moonGroup);

const pointLight = new THREE.PointLight('white',10)
pointLight.position.set(1,2,2)
moonGroup.add(pointLight)

//scene.add(new THREE.PointLightHelper(pointLight,0.1))

//scene.add(new THREE.GridHelper(5,50))
//controls.update();
//renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  // mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01 * 0.15;
  // mesh.rotation.z += 0.01;

  moonMesh.rotation.y += 0.01 * 0.75;
  moonGroup.rotation.y += 0.01 * 0.5

  //controls.update();
  renderer.render(scene, camera);
}

animate();
