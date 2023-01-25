import React ,{useState} from 'react';
import axios from 'axios';
import "../css/Uploader.css";
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { connectToNetwork } from "@ndn/autoconfig";
import { Endpoint } from "@ndn/endpoint";
import { WsTransport } from "@ndn/ws-transport";
import { AltUri, Interest, Name, Data } from "@ndn/packet";

const SceneUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [subtitle, setSubtitle] = useState("edit scene file and upload!");
  const title = "DECENT AR SCENE UPLOADER";
  const handleFileInput = (e) => setSelectedFile(e.target.files[0]);

  const uploadFile = (file) => {
    console.log("uploadFile fired.");
  }

  return (
    <div className='uploader-container'>
      <div className='uploader-title'>{title}</div>
      <div className='uploader-subtitle'>{subtitle}</div>
      <div className='uploader'>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}>Produce</button>
      </div>
    </div>
  );
}

export default SceneUploader;