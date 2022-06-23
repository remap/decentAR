import React ,{useState} from 'react';
import axios from 'axios';

const Uploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileInput = (e) => setSelectedFile(e.target.files[0]);
    const uploadFile = (file) => {
        axios.get("https://cmnyi7vpgg.execute-api.us-west-1.amazonaws.com/default/getPresignedURL")
        .then(response => {
            axios.put(response.data.uploadURL, {"body":file}, {headers: {'Content-Type': 'image/jpeg'}})
        })
    }

    return (<div className='uploader'>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>);
}

export default Uploader;