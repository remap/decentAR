import React ,{useState} from 'react';
import axios from 'axios';
import "../css/Uploader.css";
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { connectToNetwork } from "@ndn/autoconfig";
import { Endpoint } from "@ndn/endpoint";
import { WsTransport } from "@ndn/ws-transport";
import { AltUri, Interest, Name, Data, digestSigning, Component } from "@ndn/packet";
import { fetch } from "@ndn/segmented-object";

// import { PyRepoStore } from "@ndn/repo-external";
import { Forwarder } from "@ndn/fw";
import { L3Face } from "@ndn/l3face";
import { enableNfdPrefixReg } from "@ndn/nfdmgmt";

const RepoRetriever = () => {

  const getFile = async () => {
    console.log("getFile fired.");

    const face = await WsTransport.createFace({}, "wss://suns.cs.ucla.edu/ws/");
    enableNfdPrefixReg(face);

    // This node connects to the UCLA Testbed node
    // and sends a ping message to the Arizona node

    // Construct an Endpoint on the default Forwarder instance.
    const endpoint = new Endpoint();

    // We can now send Interests and retrieve Data.
    const name = new Name(`/decentar/test/client/scene-file-1`)
        .append(new Component(50, new Uint8Array([0])));
    const interest = new Interest(name);

    // const payload = await fetch(name);
    // console.log(payload);

    console.log(`<I ${interest.name}`);
    try {
        const data = await endpoint.consume(interest);
        console.log(data.content);
    } catch (err) {
        console.warn(err);
    }
  }

  return (
    <div className='uploader-container'>
      <div className='uploader-title'>DECENT AR</div>
      <div className='uploader'>
        <button onClick={() => getFile()}>Retrieve file</button>
      </div>
    </div>
  );
}

export default RepoRetriever;