import React /*, { useEffect, useRef } */ from "react";
// import { ReactMediaRecorder } from "react-media-recorder";
import VideoRecorder from "react-video-recorder";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./styles.css";

/*
const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={480} height={640} autoPlay />;
};

const FromMediaRecorder = () => {
  return (
    <ReactMediaRecorder
      video={{
        width: { exact: 480, ideal: 480 },
        height: { exact: 640, ideal: 640 },
        aspectRatio: 0.75
      }}
      render={({
        previewStream,
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl
      }) => {
        return (
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            {status !== "stopped" ? (
              <VideoPreview stream={previewStream} />
            ) : (
              <video
                src={mediaBlobUrl}
                autoplay
                loop
                width={480}
                height={640}
                style={{ border: "2px solid red" }}
                controls
              />
            )}
          </div>
        );
      }}
    />
  );
};
*/

const FromVideoRecorder = ({ push }) => {
  return (
    <VideoRecorder
      isFlipped={false}
      // isOnInitially
      countdownTime={0}
      mimeType="video/webm;codecs=vp8,opus"
      constraints={{
        audio: true,
        video: {
          width: { exact: 480, ideal: 480 },
          height: { exact: 640, ideal: 640 },
          aspectRatio: { exact: 0.7500000001, ideal: 0.7500000001 },
          resizeMode: "crop-and-scale"
        }
      }}
      onRecordingComplete={(videoBlob) => {
        // Do something with the video...
        console.log("videoBlob", videoBlob);
        push("/videoPreview", { videoBlob });
      }}
      /* renderActions={({
        onStartRecording,
        onStopRecording,
        isCameraOn,
        streamIsReady,
        isVideoInputSupported,
        isInlineRecordingSupported,
        thereWasAnError,
        isConnecting,
        isRunningCountdown,
        isReplayingVideo
      }) => {
        console.log({ isReplayingVideo });
        if (
          (!isInlineRecordingSupported && !isVideoInputSupported) ||
          thereWasAnError ||
          isConnecting ||
          isRunningCountdown ||
          isReplayingVideo
        ) {
          return null;
        }

        return (
          <div style={{ position: "absolute", bottom: "10%" }}>
            <button
              onClick={() => {
                if (isCameraOn && streamIsReady) {
                  onStartRecording();
                }
              }}
            >
              Record
            </button>
            <button onClick={onStopRecording}>Stop</button>
          </div>
        );
      }} */
    />
  );
};

const VideoRecordPage = (props) => {
  return (
    <div className="App">
      <h1>Video record</h1>

      <div style={{ width: "100%", maxWidth: 480, height: 640 }}>
        <FromVideoRecorder push={props.history.push} />
      </div>
    </div>
  );
};

const VideoPreviewPage = (props) => {
  return (
    <div className="App">
      <h1>Video preview</h1>

      {props.location.state && props.location.state.videoBlob && (
        <div style={{ width: "100%", maxWidth: 480, height: 640 }}>
          <video
            src={window.URL.createObjectURL(props.location.state.videoBlob)}
            width={480}
            height={640}
            autoPlay
            loop
            controls
          />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect to="/videoRecord" exact path="/" />
        <Route path="/videoRecord" component={VideoRecordPage} />
        <Route path="/videoPreview" component={VideoPreviewPage} />
      </Switch>
    </Router>
  );
}
