import React from "react";

function TextToSpeech({ text, children }) {
  const handleClick = () => {
    if (text) {
      const voices = window.speechSynthesis.getVoices();

      // Select a female voice, preferably in English
      const femaleVoice = voices.find((voice) => voice.name.toLowerCase().includes("female") && voice.lang.startsWith("en")) || voices[0]; // Fallback to the first available voice

      // Spell out the text letter by letter
      const spellText = text.split("").join(", ");
      const spellUtterance = new SpeechSynthesisUtterance(spellText);
      spellUtterance.voice = femaleVoice;
      spellUtterance.rate = 0.8; // Slower rate for spelling

      // Pronounce the whole text after spelling
      const pronounceUtterance = new SpeechSynthesisUtterance(text);
      pronounceUtterance.voice = femaleVoice;

      // Create a sequence of utterances
      spellUtterance.onend = () => {
        window.speechSynthesis.speak(pronounceUtterance);
      };

      window.speechSynthesis.speak(spellUtterance);
    }
  };

  return <span onClick={handleClick}>{children}</span>;
}

export default TextToSpeech;
