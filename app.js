// Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  // Create scene
  scene = new THREE.Scene()

  const fov = 100
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1
  const far = 2000
  //Camera Setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(0, 0, 15);

    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 5)
    light.position.set(10,10,100)
    scene.add(light)

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./water/scene.gltf", function (gltf) {
    scene.add(gltf.scene);

    house = gltf.scene.children[0]

    animate()
  });
}

function animate(params) {
    requestAnimationFrame(animate)
    house.rotation.z += 0.005
    renderer.render(scene, camera)
}

init();

function onWindovResize(params) {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
}

window.addEventListener('resize', onWindovResize)
