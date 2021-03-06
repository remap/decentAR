import React ,{useState} from 'react';
import axios from 'axios';
import "../css/Uploader.css";
import JSZip from "jszip";
import { saveAs } from 'file-saver'

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [subtitle, setSubtitle] = useState("upload a GLTF file!!")
  const handleFileInput = (e) => setSelectedFile(e.target.files[0]);

  const uploadFile = (file) => {
    axios.get("https://bxyhhrw8zg.execute-api.us-west-1.amazonaws.com/default/getPresignedURLUpload")
    .then(response => {
      axios.put(response.data.uploadURL, file, {headers: {'Content-Type': 'model/gltf-binary', 'Access-Control-Allow-Origin': '*'}})
    })
  }

  return (
    <div className='uploader-container'>
      <div className='uploader-title'>DECENT AR</div>
      <div className='uploader-subtitle'>{subtitle}</div>
      <div className='uploader'>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      </div>
    </div>
  );
}

export default Uploader;