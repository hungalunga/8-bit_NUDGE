import { Button } from 'primereact/button';
import React, { useEffect } from 'react';

export default function TextToSpeech(props) {
  const getVoices = () => {
    let voices = speechSynthesis.getVoices();
    if (!voices.length) {
      let utterance = new SpeechSynthesisUtterance('');
      speechSynthesis.speak(utterance);
      voices = speechSynthesis.getVoices();
    }
    return voices;
  };

  useEffect(() => {
    getVoices();
  }, []);

  const handleClick = () => {
    let voices = getVoices();
    let rate = 5,
        pitch = 1,
        volume = 0.5;
    let text = props.speech;

    speak(text, voices[0], rate, pitch, volume);
  };

  function speak(text, voice, rate, pitch, volume) {
    let speakData = new SpeechSynthesisUtterance();
    speakData.volume = 0.5; // From 0 to 1
    speakData.rate = 0.9; // From 0.1 to 10
    speakData.pitch = 1; // From 0 to 2
    speakData.text = text;
    speakData.lang = 'en';
    speakData.voice = voice;

    speechSynthesis.speak(speakData);
  }

  return (
    <div>
      <Button onClick={handleClick} icon="pi pi-volume-up" severity="secondary" />
    </div>
  );
}
