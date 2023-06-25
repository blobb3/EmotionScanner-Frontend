<script>
    /*----------------------------------------------- */
    /* konnte ich leider bis zum Schluss nicht richtig umsetzen => darum in versteckter Svelte-Page */
    /*----------------------------------------------- */
    import { onMount } from "svelte";
    import axios from "axios";
  
    let base_url = "http://heinejan.pythonanywhere.com";
  
    let FaceLoading = false;
    let prediction = "";
  
    let VIDEO;
    let ENABLE_CAM_BUTTON;
    let videoPlaying;
    let hasPictureBeenTaken = false;
    let ErrorMessage = "";
  
    let canvas;
    let context;
  
    let width = 640;
    let height = 480;
  
    // überprüft, ob der Browser die Methode getUsermedia zur Verfügung stellt
    function hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
  
    // überprüft, ob der Browser die Methode getUserMedia untersützt (wenn ja Konfigurationen und video playing auf true)
    function enableCam() {
      if (hasGetUserMedia()) {
        const constraints = {
          video: true,
          width: width,
          height: height,
        };
  
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
  
    // zeichnet das aktuelle Frame des Videos auf canvas (Standbild des Videos wird ermöglicht für Emotionserkennung)
    function snap() {
      context.drawImage(VIDEO, 0, 0, canvas.width, canvas.height);
      hasPictureBeenTaken = true;
    }
  
    // konvertiert canvas-Bild und ruft funktion predict auf, um Bild zu analysieren
    function convertCanvasToData() {
      canvas.toBlob((blob) => {
        predict(blob);
      }, "image/jpeg");
    }
  
    // URl für Http-Aufruf, formdata-Objekt erstellung und aufgenomemnes Bild hinzugefügt
    function predict(data) {
      let url = base_url + "/api/predict-emotion";
      const formData = new FormData();
      formData.append("image", data, "emotion_image.jpg");
  
      // auf true => um Ladezustand anzuzeigen
      FaceLoading = true;
  
      // Http-post mit axios => wenn erfolgreich - ergebnis in prediction (ansonsten fehlermeldung)
      axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          FaceLoading = false;
          ErrorMessage = "";
          prediction = response.data.emotion;
        })
        .catch(function (error) {
          console.log("Error", error.message);
          FaceLoading = false;
          ErrorMessage = "Error predicting emotion.";
        });
    }
  
    // Code ausführung, wenn Svelte-Komponente monitert (canvas)
    onMount(() => {
      context = canvas.getContext("2d");
    });
  </script>
  
  <bodys>
    <div class="box">
      <h1 class="title">
        Emotion Recognition - How Computers See Through Our Feelings
      </h1>
      <p>
        Emotion recognition is a process for recognizing feelings based on based
        on images, videos, audio and text using artificial Intelligence (AI). In
        this scenario, the technology can be used to Emotion recognition data from
        various sources such as photos, audio recordings, videos, real-time
        conversations, and documentaries for Sentiment Analysis. In recent years,
        the Emotion recognition has become increasingly popular. The global market
        for Emotion recognition is expected to reach USD 37.1 billion by 2026.
        ...billion. As part of the technology family of "affective computing" the
        main goal is to help computers or machines interpret human emotions and
        interpret human emotions and affective states, by examining nonverbal
        forms of communication such as facial expressions, sentence structure,
        language use and more. The recognition of emotions is nothing new.
        Researchers have been studying it for decades, especially in fields like
        psychology and human-computer Human-Computer Interaction. To date, many
        companies such as. Google, NEC and Eyeris have invested heavily in the
        development of facial and Face and emotion recognition.
      </p>
      <h1 class="title">The training for emotion recognition?</h1>
      <p>
        For AI to recognize human emotions, it must be trained. It is necessary to
        train machine learning (ML) algorithms with with large datasets to
        successfully recognize and analyze emotions. recognize and analyze
        emotions. You can segment ML algorithms and train them depending on
        whether you want to detect emotions in video, audio, text or
        Conversational data. The more data you have, the better, but it's critical
        that they adequately represent all ethnicities, genders, accents, age
        groups, etc., appropriately represented. This approach is usually usually
        dimensional and categorical.
      </p>
      <p>
        An emotion recognition system integrated with an AI-powered Facial
        recognition technology can identify a person's emotions in one of person's
        feelings in any of the following six primary categories of emotion
        Recognize:
      </p>
      <div class="centered-list">
        <ol class="centered-list-items">
          <li>Anger</li>
          <li>Neutral</li>
          <li>Disgust</li>
          <li>Fear</li>
          <li>Happiness</li>
          <li>Sadnesss</li>
          <li>Surprise</li>
        </ol>
      </div>
  
      <h1 class="title">Why is the recognition of emotions important?</h1>
      <p>
        Emotion recognition is important because it can be used to improve
        education, entertainment, health, marketing and safety initiatives. safety
        initiatives.Car companies such as BMW, Ford and Kia Motors are exploring
        this technology to assess driver alertness. Assess. This can make a huge
        contribution to the safety of drivers on the road. They can also create
        customer profiles based on the Based on the available text, audio and
        video data. This approach can help you target a particular customer when
        he or she is when they are in the best possible emotional state to be more
        receptive to your offer. Be more receptive to your offer. Marketers can
        also use emotion recognition technology to quickly determine whether a
        customer is identify whether a customer is interested in a product or
        service, and to in a product or service and decide on the next appropriate
        action. decide. In the distant future, emotion recognition could also help
        robots to communicate better with humans.
      </p>
      <h1 class="title">Try it out for yourself now with our prototype:</h1>
      <p>To do this, turn on the camera and give permission.</p>
  
      {#if FaceLoading}
        <h3>Loading model...</h3>
      {/if}
      {#if ErrorMessage}
        <h3>{ErrorMessage}</h3>
      {/if}
  
      <div class="container">
        {#if prediction !== ""}
          <div class="row">
            <div class="col col-lg-2">Prediction:</div>
            <div class="col col-lg-10">{prediction}</div>
          </div>
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
              on:click={enableCam}
            >
              Enable Webcam
            </button>
            <button class="dark-button" on:click={snap}>Take Picture</button>
          </div>
  
          <div class="col col-lg-6">
            <canvas bind:this={canvas} {width} {height} />
            {#if hasPictureBeenTaken}
              <button class="dark-button" on:click={convertCanvasToData}
                >Predict Emotion</button
              >
            {/if}
          </div>
        </div>
      </div>
    </div>
  </bodys>
  
  <style>
    canvas {
      padding-left: 5px;
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
  
    .centered-list {
      background-color: #333333;
      border-radius: 10px;
      padding: 10px;
      margin: 20px auto;
      color: #ffffff;
      max-width: 500px;
    }
  
    .centered-list-items {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 0;
      margin: 0;
      list-style: none;
      text-align: left;
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
  </style>
  