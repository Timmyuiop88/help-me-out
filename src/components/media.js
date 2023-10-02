import React, { useState } from 'react';

const ScreenRecorder = () => {
  const [combinedStream, setCombinedStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [includeCamera, setIncludeCamera] = useState(false);

  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setCombinedStream(screenStream);

      if (includeCamera) {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const tracks = [...screenStream.getTracks(), ...cameraStream.getTracks()];
        setCombinedStream(new MediaStream(tracks));
      }

      setRecording(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopRecording = () => {
    if (combinedStream) {
      combinedStream.getTracks().forEach(track => track.stop());
      setCombinedStream(null);
      setRecording(false);
    }
  };

  return (
    <div>
      <label>
        Include Camera
        <input
          type="checkbox"
          checked={includeCamera}
          onChange={() => setIncludeCamera(!includeCamera)}
        />
      </label>
      <br />
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {combinedStream && (
        <video
          autoPlay
          muted
          srcObject={combinedStream}
          style={{ position: 'fixed', bottom: 0, left: 0, width: '200px' }}
        />
      )}
    </div>
  );
};

export default ScreenRecorder;