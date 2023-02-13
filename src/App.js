import SceneEditor from "./sceneEditor/SceneUploader";
import Navigator from "./navigator/Navigator";
import FileUploader from "./sceneEditor/FileUploader";
import FileUploaderPage from "./pages/FileUploaderPage";
import SceneUploaderPage from "./pages/SceneUploaderPage";
import ViewerPage from "./pages/ViewerPage";
import Layout from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import './css/App.css';

function App() {
  return (
    <div className="App">  
      {/* <FileUploader/> */}
      {/* <canvas style={{width: "100%", height: "100%"}}id="renderCanvas"></canvas> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fileuploaderpage" element={<FileUploaderPage />} />
          <Route path="sceneuploaderpage" element={<SceneUploaderPage />} />
          <Route path="viewerpage" element={<ViewerPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

// <div style={{width: "100%", height: "100%", backgroundColor: "blue"}}></div>
// <canvas style={{width: "100%", height: "100%"}}id="renderCanvas"></canvas>

export default App;