import React from "react";

function TextToSpeech({ text, children }) {
  const handleClick = () => {
    if (text) {
      const voices = window.speechSynthesis.getVoices();

      // Select a voice in English
      const chosenVoice = voices.find((voice) => voice.lang.startsWith("en"));

      // Spell out the text letter by letter
      const spellText = text.split("").join(", ");
      const spellUtterance = new SpeechSynthesisUtterance(spellText);
      spellUtterance.voice = chosenVoice;
      spellUtterance.rate = 0.8; // Slower rate for spelling

      // Pronounce the whole text after spelling
      const pronounceUtterance = new SpeechSynthesisUtterance(text);
      pronounceUtterance.voice = chosenVoice;

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
