<script>
    let titles = [
        { level: 1, text: "Problem statement", content: "The problem at hand is to develop an accurate and reliable machine learning application for emotion classification in images. The end users, including individuals, researchers, and professionals across various domains, aim to understand and interpret the emotions expressed in images. This technology holds significance in fields such as psychological research, advertising and marketing, entertainment, human-computer interaction, social media analysis, customer service, and healthcare. The main obstacles to overcome are the complexity and subjectivity of human emotions, the need for a diverse and representative dataset, and the requirement for a model capable of generalizing well and handling real-time applications. By addressing these challenges, we can create a powerful tool that accurately classifies emotions in images and enables various applications and insights in different industries." },
        { level: 2, text: "Endusers", content: "Individuals, researchers, and professionals across various domains who require accurate emotion classification in images." },
        { level: 2, text: "Goal of Endusers", content: "The goal of end users is to understand and interpret the emotions expressed in images for various applications, including but not limited to: Psychological Research: Emotion classification can aid in studying human behavior, emotional responses, and mental health conditions. Advertising and Marketing: Analyzing emotions in images can help tailor advertisements and marketing campaigns to elicit desired emotional responses from target audiences. Entertainment Industry: Emotion classification can enhance user experiences in gaming, virtual reality, and augmented reality applications by adapting content based on emotional states. Human-Computer Interaction: Emotion recognition can enable more natural and intuitive interactions between humans and machines, such as emotion-based user interfaces and affective computing. Social Media Analysis: Emotion classification can provide valuable insights into public sentiment, opinion mining, and understanding trends on social media platforms. Customer Service and User Experience: Analyzing emotions in customer interactions can help improve customer service, product design, and user experience. Healthcare and Therapy: Emotion classification can assist in diagnosing and monitoring emotional disorders, providing personalized therapy, and improving patient care." },
        { level: 2, text: "Obstacle to be solved", content: "The main obstacle to be solved is developing an accurate and reliable machine learning model for emotion classification that can handle the complexities and subjectivity of human emotions. Additionally, obtaining a diverse and representative dataset of emotion-labeled images for training and validation poses a challenge. The model should also be capable of generalizing well to unseen data and be efficient enough for real-time or near real-time applications." },
        { level: 1, text: "Model Application", content: "In conclusion, the emotion recognition application project has produced important insights and challenges. Although the application has some problems on different platforms and devices and one could still work on the accuracy of the model, successes could also be recorded. By taking user feedback into account and implementing the necessary improvements, the project could become a successful and user-friendly application in the future." },
        { level: 2, text: "Result of user valiation", content: "User feedbacks suggest that possibly, to improve smartphone usability, Bootstrap could be used as a framework for the frontend. Bootstrap provides a responsive design structure and components that automatically adapt to different screen sizes. Consequently, implementing Bootstrap could reduce UI issues on smartphones and optimize the user experience. Additionally, if the app is developed further, compatibility of different platforms and browsers should be ensured (especially for Apple devices, which are likely to have different security settings). Also, the camera functionality should be thoroughly tested again on all supported devices and ensure that it works properly. These issues need to be prioritized and fixed in the future to reach a broader user base. Furthermore, in addition to the points already mentioned, it should be mentioned that for future developments and improvements of the emotion recognition application, an increased accuracy of the model should be aimed for (personal feedback). To improve the accuracy of the model, measures such as training with more epochs, expanding the data set, or adding data from different sources could be considered. These measures can make the model more responsive to different emotions and individual expressions, which can lead to improved recognition accuracy. Improving the accuracy of the model is of great importance since it is the main function of the emotion recognition application." },
    ];
</script>

<bodey>
    <div class="container">
        <div class="toc">
            <h3>table of contents</h3>
            <ul>
                {#each titles as title}
                    {#if title.level === 1}
                        <li><a href="#section{title.index}">{title.text}</a></li>
                    {/if}
                {/each}
            </ul>
        </div>

        <div class= "box">
        <div class="content">
            {#each titles as title}
                {#if title.level === 1}
                    <h1 id="section{title.index}">{title.text}</h1>
                    {#if title.content}
                        <p>{title.content}</p>
                    {/if}
                {:else if title.level === 2}
                    <h2 id="section{title.parentIndex}-{title.index}">{title.text}</h2>
                    {#if title.content}
                        <p>{title.content}</p>
                    {/if}
                {/if}
            {/each}
        </div>
    </div>
</div>
</bodey>

<style>
    .container {
        display: flex;
    }

    .toc {
        flex: 0 0 20%;
        padding: 20px;
        background-color: rgb(175, 172, 172);
        border-radius: 10px;
    }

    .content {
        flex: 1;
        padding: 20px;
    }

    .toc ul {
        list-style-type: none;
        padding: 0;
    }

    .toc li {
        margin-bottom: 5px;
    }

    .box {
        background-color: #f0f0f0;
        padding: 20px;
        border-radius: 10px;
        margin: 0 auto; /* Zentriert die Box horizontal */
        text-align: center; /* Zentriert den Text innerhalb der Box */
        max-width: 100%;
    }
</style>
