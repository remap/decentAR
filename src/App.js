import SceneEditor from "./sceneEditor/SceneEditor";
import Navigator from "./navigator/Navigator";
import Uploader from "./sceneEditor/Uploader";
import { connectToNetwork } from "@ndn/autoconfig";
import { Endpoint } from "@ndn/endpoint";
import { AltUri, Interest, Name } from "@ndn/packet";
import './css/App.css';

function App() {
  return (
    <div className="App">  
      <Uploader/>
      {/* <canvas style={{width: "100%", height: "100%"}}id="renderCanvas"></canvas> */}
    </div>
  );
}

// <div style={{width: "100%", height: "100%", backgroundColor: "blue"}}></div>
// <canvas style={{width: "100%", height: "100%"}}id="renderCanvas"></canvas>

export default App;