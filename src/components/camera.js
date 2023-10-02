import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Center,
    Switch,
    Button,
    AspectRatio
  } from '@chakra-ui/react';
function AppStreamCam() {
  const streamCamVideo = () => {
    const constraints = { audio: true, video: { width: 1280, height: 720 } };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        const video = document.querySelector("#videoElement");
        video.srcObject = mediaStream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      })
      .catch((err) => {
        console.log(`${err.name}: ${err.message}`);
      });
  };

  return (
    <div>
      <div id="container">
      <AspectRatio 
      position={'absolute'}
      bottom={'0'}
      right={'0'}
      maxW='160px' ratio={1}>
        <video autoPlay={true} id="videoElement" controls></video>
        </AspectRatio>
      </div>
    
      <br />
      <button onClick={streamCamVideo}>Start streaming</button>
    </div>
  );
}

export default AppStreamCam;