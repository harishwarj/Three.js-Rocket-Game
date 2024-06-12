import * as THREE from 'three';

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures
const textureLoader = new THREE.TextureLoader();
const rocketTexture = textureLoader.load('assets/rocket_texture.jpg');
const groundTexture = textureLoader.load('assets/ground_texture.jpg');

// Create a rocket geometry with texture
const rocketGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
const rocketMaterial = new THREE.MeshBasicMaterial({ map: rocketTexture });
const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);
rocket.position.y = 1.5; // Position the rocket on the platform
scene.add(rocket);

// Create the platform
const platformGeometry = new THREE.BoxGeometry(3, 0.5, 3);
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.position.y = 0.25;
scene.add(platform);

// Create the ground with texture
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2;
ground.position.y = -3;
scene.add(ground);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rocket launch logic
  rocket.position.y += 0.01; // Move the rocket up slowly

  renderer.render(scene, camera);
}

animate();
