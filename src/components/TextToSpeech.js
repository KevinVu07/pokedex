import React from "react";

function TextToSpeech({ text, children }) {
  const handleClick = () => {
    if (text) {
      // Spell out the text letter by letter
      const spellText = text.split("").join(", ");
      const spellUtterance = new SpeechSynthesisUtterance(spellText);

      // Pronounce the whole text after spelling
      const pronounceUtterance = new SpeechSynthesisUtterance(text);

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
