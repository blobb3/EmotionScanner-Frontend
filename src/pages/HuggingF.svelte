<script>
  import { onMount } from "svelte";
  import axios from "axios";

  let huggingFaceLoading = false;
  let prediction = "";
  let facesData = [];

  let VIDEO;
  let ENABLE_CAM_BUTTON;
  let videoPlaying;
  let hasPictuteBeenTaken = false;
  let huggingFaceErrorMessage = "";

  let canvas;
  let context;

  let width = 640;
  let height = 480;

  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  function enableCam() {
    if (hasGetUserMedia()) {
      // getUsermedia parameters.
      const constraints = {
        video: true,
        width: width,
        height: height,
      };

      // Activate the webcam stream.
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        VIDEO.srcObject = stream;
        VIDEO.addEventListener("loadeddata", function () {
          videoPlaying = true;
          ENABLE_CAM_BUTTON.classList.add("removed");
        });
      });
    } else {
      console.warn("getUserMedia() is not supported by your browser");
    }
  }

  function snap() {
    context.drawImage(VIDEO, 0, 0, canvas.width, canvas.height);
    hasPictuteBeenTaken = true;
  }

  function convertCanvasToData() {
    canvas.toBlob((blob) => {
      predict(blob);
    }, "image/jpeg");
    drawFaceRectangles();
  }

  function drawFaceRectangles() {
    for (let faceData of facesData) {
      const [x, y, w, h] = faceData;
      context.beginPath();
      context.rect(x, y, w, h);
      context.lineWidth = 2;
      context.strokeStyle = "#00FF00";
      context.fillStyle = "rgba(0, 255, 0, 0.1)";
      context.fill();
      context.stroke();
    }
  }

  function predict(data) {
    facesData = []; // Zurücksetzen der Gesichtsdaten
    let url =
      "https://api-inference.huggingface.co/models/heinjan/TI-mobilenetv3-imagenet-v2";
    axios
      .post(
        url,
        data, //image data
        {
          headers: {
            Authorization: "Bearer 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",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        huggingFaceLoading = false;
        huggingFaceErrorMessage = "";
        prediction = JSON.stringify(response.data);
        facesData = response.data.faces; // Aktualisierte Gesichtsdaten speichern
        drawFaceRectangles(); // Gesichtsrechtecke zeichnen
      })
      .catch(function (error) {
        // error 503 Object { error: "Model kuhs/cats_classficiation is currently loading", estimated_time: 20 }1
        if (error.response.status === 503) {
          //503 is service unavaiulable
          huggingFaceLoading = true;
          huggingFaceErrorMessage = error.response.data.error;
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  onMount(() => {
    context = canvas.getContext("2d");
  });
</script>

<body>
  <div class="box">
    <h1 class="title">Emotion Recognition - with hugging face</h1>

    {#if huggingFaceLoading}
      <h3>{huggingFaceErrorMessage}</h3>
    {/if}
    <div class="container">
      {#if prediction !== ""}
        <div class="row">
          <div class="col col-lg-2">Predictions:</div>
          <div class="col col-lg-10">
            <ul class="custom-list">
              {#each JSON.parse(prediction) as item}
                <li>{item.label}: {item.score}</li>
              {/each}
            </ul>
          </div>
        </div>
        <br />
      {/if}

      <div class="row">
        <div class="col col-lg-6">
          <video
            bind:this={VIDEO}
            id="webcam"
            {height}
            {width}
            autoplay
            muted
          />
          <button
            class="dark-button"
            bind:this={ENABLE_CAM_BUTTON}
            on:click={enableCam}>Enable Webcam</button
          >
          <button class="dark-button" on:click={snap}>Take Picture</button>
        </div>

        <div class="col col-lg-6">
          <canvas bind:this={canvas} {width} {height} />
          {#if hasPictuteBeenTaken}
            <button class="dark-button" on:click={convertCanvasToData}
              >Predict</button
            >
          {/if}
        </div>
      </div>
    </div>
  </div>
</body>

<style>
  canvas {
    padding-left: 5px;
  }

  .box {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto; /* Hinzugefügt: Zentriert die Box horizontal */
    text-align: center; /* Hinzugefügt: Zentriert den Text innerhalb der Box */
    max-width: 100%;
  }
  .title {
    border-bottom: 6px solid #333333;
    display: inline-block;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }

  .dark-button {
    background-color: #333333;
    color: #ffffff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .dark-button:hover {
    background-color: #555555;
  }
</style>
