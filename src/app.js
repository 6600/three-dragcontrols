import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  AmbientLight,
  SpotLight,
  LightShadow,
  PCFShadowMap
} from 'three';
import GLTFLoader from 'three-gltf-loader'
import DragControls from 'three-dragcontrols';

import './app.css';

let camera, scene, renderer;
const objects = [];

function init() {
  // 创建场景
  scene = new Scene();
  // 创建相机
  camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  // 设置相机位置
  camera.position.z = 1000;

  // 设置光源
  scene.add(new AmbientLight(0x505050));
  const light = new SpotLight(0xffffff, 1.5);
  light.position.set(0, 500, 2000);
  light.castShadow = true;
  light.shadow = new LightShadow(new PerspectiveCamera(50, 1, 200, 10000));
  light.shadow.bias = -0.00022;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add(light);

  // 创建模型
  const loader = new GLTFLoader()
  loader.load('./test.gltf', (gltf) => {
    console.log(gltf)
    scene.add(gltf.scene)
    objects.push(gltf.scene)
    console.log(objects)
    const dragControls = new DragControls(objects, camera, renderer.domElement);
  })

  renderer = new WebGLRenderer({antialias: true});
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = false;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  document.body.appendChild(renderer.domElement);
  

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

init();
animate();