import { Button } from 'primereact/button';
import React, { useEffect, useRef } from 'react';

export default function TextToSpeech(props) {
  const speechRef = useRef(null);
  const isPaused = useRef(false);

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

  let voices = getVoices(),
      rate = 5,
      pitch = 1,
      volume = 0.5,
      text = props.speech;

      const handleClick = () => {
        if (speechSynthesis.speaking) {
          if (isPaused.current) {
            speechSynthesis.resume();
            isPaused.current = false;
          } else {
            speechSynthesis.pause();
            isPaused.current = true;
          }
        } else {
          speak(text, voices[0], rate, pitch, volume);
        }
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

function forGit(){}
