/* globals BABYLON XR8 XRExtras */
import { useEffect } from "react";
import SceneEditor from "./sceneEditor/SceneEditor";
import Navigator from "./navigator/Navigator";
import './css/App.css';

let surface, engine, scene, camera;

function App() {
  useEffect(() => startScene(), [])
  // Populates some object into an XR scene and sets the initial camera position.
  const initXrScene = () => {
    const directionalLight = new BABYLON.DirectionalLight(
      'DirectionalLight',
      new BABYLON.Vector3(0, -1, 1),
      scene
    )
    directionalLight.intensity = 1.0

    const ground = BABYLON.Mesh.CreatePlane('ground', 100, scene)
    ground.rotation.x = Math.PI / 2
    ground.material = new BABYLON.StandardMaterial('groundMaterial', scene)
    ground.material.diffuseColor = BABYLON.Color3.Purple()
    ground.material.alpha = 0
    surface = ground

    // Set the initial camera position relative to the scene we just laid out. This must be at a
    // height greater than y=0.
    camera.position = new BABYLON.Vector3(0, 3, -5)
  }

  const startScene = () => {
    const canvas = document.getElementById('renderCanvas')
  
    engine = new BABYLON.Engine(canvas, true, { stencil: true, preserveDrawingBuffer: true })
    engine.enableOfflineSupport = false
  
    scene = new BABYLON.Scene(engine)
    camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 3, 0), scene)
  
    initXrScene({ scene, camera }) // Add objects to the scene and set starting camera position.
  
    // Connect the camera to the XR engine and show camera feed
    camera.addBehavior(window.XR8.Babylonjs.xrCameraBehavior())
  
    engine.runRenderLoop(() => {
      scene.render()
    })
  
    window.addEventListener('resize', () => {
      engine.resize()
    })
  }

  return (
    <div className="App">  
      <Navigator/>
      <canvas style={{width: "100%", height: "100%"}}id="renderCanvas"></canvas>
    </div>
  );
}

// <div style={{width: "100%", height: "100%", backgroundColor: "blue"}}></div>
// <canvas style={{width: "100%", height: "100%"}}id="renderCanvas"></canvas>

export default App;