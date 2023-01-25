import SceneEditor from "./sceneEditor/SceneEditor";
import Navigator from "./navigator/Navigator";
import Uploader from "./sceneEditor/Uploader";
import SceneUploader from "./prototypeComponents/SceneUploader";
import FileUploader from "./prototypeComponents/FileUploader";
import './css/App.css';

function App() {
  return (
    <div className="App">  
      {/* <FileUploader/> */}
      <SceneUploader/>
      {/* <canvas style={{width: "100%", height: "100%"}}id="renderCanvas"></canvas> */}
    </div>
  );
}

// <div style={{width: "100%", height: "100%", backgroundColor: "blue"}}></div>
// <canvas style={{width: "100%", height: "100%"}}id="renderCanvas"></canvas>

export default App;