import React ,{useState} from 'react';
import axios from 'axios';
import "../css/Uploader.css";
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { connectToNetwork } from "@ndn/autoconfig";
import { Endpoint } from "@ndn/endpoint";
import { WsTransport } from "@ndn/ws-transport";
import { AltUri, Interest, Name, Data, digestSigning } from "@ndn/packet";
import { enableNfdPrefixReg } from '@ndn/nfdmgmt';
import { PyRepoStore } from '@ndn/repo-external';

const UploaderNewWithClient = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [subtitle, setSubtitle] = useState("upload a GLTF file!!")
  const handleFileInput = (e) => setSelectedFile(e.target.files[0]);

  // upload a file to the repo
  const uploadFile = async (file) => {
    console.log("uploadFile fired.");

    const repoPrefix = "/testrepo";
    const dataPrefix = new Name(`/NDNts-repo-external/${Math.trunc(Math.random() * 1e8)}`);

    const face = await WsTransport.createFace({}, "wss://localhost:9696");
    enableNfdPrefixReg(face);

    const store = new PyRepoStore({
      repoPrefix: new Name(repoPrefix),
    });

    const packets = [];
    for (let i = 0; i < 256; ++i) {
      const data = new Data(dataPrefix.append(`${i}`));
      data.freshnessPeriod = 1;
      await digestSigning.sign(data);
      packets.push(data);
    }

    console.log(`Inserting ${packets.length} packets under ${dataPrefix} to ${repoPrefix}`);
    try {
      await store.insert(...packets);
    } finally {
      await store.close();
      face.close();
    }
  }

  const getFile = async (fileName) => {
    console.log("getFile fired.");

    const repoPrefix = "/testrepo";

    const face = await WsTransport.createFace({}, "wss://localhost:9696");
    enableNfdPrefixReg(face);

    const store = new PyRepoStore({
      repoPrefix: new Name(repoPrefix),
    });

    try {
      await store.get(fileName);
    } finally {
      await store.close();
      face.close();
    }
  }

  const produce = async (file) => {
    console.log("produce fired.");
    const uplink = await WsTransport.createFace({}, "ws://localhost:9696");
    const endpoint = new Endpoint();

    // endpoint.produce() creates a producer.
    // The first argument is the name prefix.
    // The second argument is a callback function that is invoked for each incoming Interest;
    // this must be an async function that returns a Promise.
    endpoint.produce("/add", async (interest) => {
      console.log(`Got Interest ${interest.name}`);
      // This producer is a calculator. It expects Interest name to have three
      // components: "add", x, and y. If it's not, reject the Interest.
      if (interest.name.length !== 3) {
        console.log("Wrong name length.");
        return;
      }

      // Extract x and y numbers, then compute the sum.
      const x = Number.parseInt(interest.name.at(1).text, 10);
      const y = Number.parseInt(interest.name.at(2).text, 10);
      const sum = x + y;
      console.log(`${x} + ${y} = ${sum}`);

      // Make a Data packet that has the same name as the Interest.
      const data = new Data(interest.name);
      data.freshnessPeriod = 1000;
      data.content = new TextEncoder().encode(`${sum}\n`);

      // Sending the Data is as simple as returning it from the function.
      return data;
    },
    // options
    );
  }

  const consume = async () => {
    console.log('consume fired!');

    const uplink = await WsTransport.createFace({}, "ws://localhost:9696");
    const endpoint = new Endpoint();

    const x = 13;
    const y = 44;

    // Make an Interest packet, asking the producer to compute x+y.
    const interest = new Interest(`/add/${x}/${y}`);
    interest.mustBeFresh = true;

    try {
      // Send the Interest, and wait for Data to come back.
      const data = await endpoint.consume(interest);

      // Print the Data payload.
      process.stdout.write(data.content);
    } catch (err) {
      // In case of Data retrieval failure, show what went wrong.
      console.warn(err);
    }
    uplink.close();
  }

  return (
    <div className='uploader-container'>
      <div className='uploader-title'>DECENT AR</div>
      <div className='uploader-subtitle'>{subtitle}</div>
      <div className='uploader'>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => produce(selectedFile)}>Produce</button>
      </div>
      <button onClick={() => consume()}>Consume</button>
    </div>
  );
}

export default UploaderNewWithClient;