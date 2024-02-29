<script>
    import axios from "axios";

    let img;
    let files;
    let prediction = "";
    let huggingFaceLoading = false;
    let huggingFaceErrorMessage = "";

    $: if (files) {
        // Note that `files` is of type `FileList`, not an Array:
        // https://developer.mozilla.org/en-US/docs/Web/API/FileList
        console.log(files);

        //Adds a onload for the image. The callback onload is called when the image is loaded.
        actionOnImageLoad();

        let reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
            console.log(e.target.result);
        };
        reader.readAsDataURL(files[0]);

        for (const file of files) {
            console.log(`${file.name}: ${file.size} bytes`);
        }
    }

    function actionOnImageLoad() {
        // Set up the image onload event
        img.onload = function () {
            // Create a new canvas
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            // Get the canvas 2D context
            var ctx = canvas.getContext("2d");

            // Draw the image onto the canvas, ignoring the alpha channel
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                predict(blob);
            }, "image/jpeg");
        };
    }

    function predict(data) {
        let url =
            "https://api-inference.huggingface.co/models/heinjan/TI-mobilenetv3-imagenet-v2";
        axios
            .post(
                url,
                data, //image data
                {
                    headers: {
                        Authorization:
                            "hugging_face_token",
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                huggingFaceLoading = false;
                huggingFaceErrorMessage = "";
                prediction = JSON.stringify(response.data);
            })
            .catch(function (error) {
                // error 503 Object { error: "Model heinejans/classficiation is currently loading", estimated_time: 20 }1
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
</script>

<bodey>
    <div class="box">
        <h1 class="title">Camera shy? Upload a picture alternatively!</h1>
        <p><bold><i>It may take a while, please be patient (warning => inexact version).</i></bold></p>
        {#if huggingFaceLoading}
            <h3>{huggingFaceErrorMessage}</h3>
        {/if}
        <label for="file_upload">Upload a picture:</label>
        <input
            accept="image/*"
            bind:files
            id="file_upload"
            name="file_upload"
            type="file"
        /> <br> <br>

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
        <img id="file_upload" bind:this={img} alt="" />
        <br>
        <br>
    
    <h1 class="title">Bored while waiting?!</h1>
    <p>This Edureka video on 'Image Classification using CNN' will give you an overview of Image Classification using Machine Learning and will help you understand various important concepts that concern Image Classification with ML: <br><a href="https://youtu.be/ejkRh9obVjk">https://youtu.be/ejkRh9obVjk</a><br></p>
</div>
</bodey>

<style>
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
