import React ,{useState} from 'react';
import axios from 'axios';
import "../css/Uploader.css";
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { connectToNetwork } from "@ndn/autoconfig";
import { Endpoint } from "@ndn/endpoint";
import { WsTransport } from "@ndn/ws-transport";
import { AltUri, Interest, Name, Data } from "@ndn/packet";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const title = "DECENT AR FILE UPLOADER";
  const [subtitle, setSubtitle] = useState("upload a GLTF file!!")
  const handleFileInput = (e) => setSelectedFile(e.target.files[0]);

  const uploadFile = (file) => {
    console.log("uploadFile fired. Uploaded file:");
    console.log(file);
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

export default FileUploader;