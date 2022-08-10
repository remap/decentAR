/* globals BABYLON TWEEN XR8 XRExtras */

const modelRootURL = './'                               // Directory where 3D model lives
const modelFile = 'tree.glb'                            // 3D model to spawn at tap
const startScale = new BABYLON.Vector3(0.1, 0.1, -0.1)  // Initial scale value for our model
const endScale = new BABYLON.Vector3(2.0, 2.0, -2.0)    // Ending scale value for our model
const animationMillis = 750                             // Animate over 0.75 seconds

let surface, engine, scene, camera

// Given an input JSON file, instantiate and position all models specified in the file relative to the specified origin.
const parseSceneJSON = (inputScene) => {
  console.log('aa');
  if (!inputScene) {
    return;
  }

  Object.entries(inputScene).forEach(([key, value]) => {
    const originPoint = Object.keys(inputScene).includes('originPoint') ? inputScene.originPoint : {"x": 0 , "y": 0, "z": 0}
    if (key !== 'originPoint') {
      BABYLON.SceneLoader.ImportMeshAsync('', value.url, null, scene).then((result) => {
        result.meshes[0].position.x = value.position.x + originPoint.x
        result.meshes[0].position.y = value.position.y + originPoint.y
        result.meshes[0].position.z = value.position.z + originPoint.z
        result.meshes[0].rotation = new BABYLON.Vector3(value.rotation.pitch, 
                                                        value.rotation.yaw, 
                                                        value.rotation.roll)
      })
    }
  })
}

// Populates some object into an XR scene and sets the initial camera position.
const initXrScene = () => {
  // Can't have CNAMEs and TXT for the same record, so for flexibility,
  // keep our data at ndn.<domain>
  
  console.log(`FETCHING: https://cloudflare-dns.com/dns-query?name=ndn.${window.location.hostname}&type=TXT&server=8.8.4.4`);
  try {
    fetch(`https://cloudflare-dns.com/dns-query?name=ndn.${window.location.hostname}&type=TXT&server=8.8.4.4`, {
      method: 'GET',
      headers: {
        'Accept': 'application/dns-json',
      }
    })
    .then(response => {
      console.log(`RESPONSE: ${response}`);
      return response.json();
    })
    .then(data => {
      console.log(data)
      console.log(`DATA: ${JSON.stringify(data)}`)
      let sceneurl=''
      if (typeof data.Answer != 'undefined') { 
        data.Answer.forEach(function(txt,k) {
          let split=txt.data.replaceAll('"','').split("=",2)
          let key = split[0]
          let value = split[1]
          console.log(`KEY: ${key}`)
          if (key==="root_scene"){
            sceneurl=value
          }}
        )
      }
      console.log(`SCENE URL: ${sceneurl}`);
      return (!!sceneurl ? fetch(sceneurl) : "");
    })
    .then(scene => (!!scene ? scene.json() : ""))
    .then(sceneJSON => parseSceneJSON(sceneJSON));
  } catch (error) {
    console.log('Error: ', error)
  }
 
  // Fetched scene file and instantiated and positioned specifieed models.
  // Light.
  const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-5, -10, 7), scene)
  light.intensity = 1.0

  const ground = BABYLON.Mesh.CreatePlane('ground', 100, scene)
  ground.rotation.x = Math.PI / 2;
  ground.material = new BABYLON.StandardMaterial('groundMaterial', scene);
  ground.material.diffuseColor = BABYLON.Color3.Purple();
  ground.material.alpha = 0
  surface = ground

  // Set the initial camera position relative to the scene we just laid out. This must be at a
  // height greater than y=0.
  camera.position = new BABYLON.Vector3(0, 2, -2)
}

const startScene = () => {
  const canvas = document.getElementById('renderCanvas')

  engine = new BABYLON.Engine(canvas, true /* antialias */)
  scene = new BABYLON.Scene(engine)
  camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, 0), scene)

  initXrScene()

  // Connect the camera to the XR engine and show camera feed
  camera.addBehavior(XR8.Babylonjs.xrCameraBehavior(), true)
  engine.runRenderLoop(() => scene.render())
  window.addEventListener('resize', () => engine.resize())
}

const onxrloaded = () => {
  XR8.addCameraPipelineModules([             // Add camera pipeline modules.
    XRExtras.AlmostThere.pipelineModule(),   // Detects unsupported browsers and gives hints.
    XRExtras.Loading.pipelineModule(),       // Manages the loading screen on startup.
    XRExtras.RuntimeError.pipelineModule(),  // Shows an error image on runtime error.
  ])

  startScene()
}

// Show loading screen before the full XR library has been loaded.
const load = () => { XRExtras.Loading.showLoading({onxrloaded}) }
window.onload = () => {
  if (window.XRExtras) {
    console.log("fdhjioveohioehr!");
    load()
  } else {
    window.addEventListener('xrextrasloaded', load)
  }
}