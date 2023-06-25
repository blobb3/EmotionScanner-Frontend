// Pages
import Emotion from "./pages/Emotion.svelte";
import Dokumentation from "./pages/Dokumentation.svelte";
import HuggingF from "./pages/HuggingF.svelte";
import HuggingFfiles from "./pages/HuggingFfiles.svelte";

export default {

    // Emotion Scanner
    '/emotion': Emotion,

    //again: emotions
    '/hffiles': HuggingFfiles,

    // huggingface unterricht
    '/huggingface': HuggingF,

    //dokumentation & Home
    '/': Dokumentation,
    '/dokumentation': Dokumentation,

}