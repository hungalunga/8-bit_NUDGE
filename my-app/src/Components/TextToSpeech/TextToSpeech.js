import { Button } from 'primereact/button';
import React, { useEffect } from 'react';

export default function TextToSpeech() {
    useEffect(() => {
        function getVoices() {
          let voices = speechSynthesis.getVoices();
          if (!voices.length) {
            let utterance = new SpeechSynthesisUtterance('');
            speechSynthesis.speak(utterance);
            voices = speechSynthesis.getVoices();
          }
          return voices;
        }
      }, []);

    const handleClick = () => {
        // useEffect(() => {
        //   function getVoices() {
        //     let voices = speechSynthesis.getVoices();
        //     if (!voices.length) {
        //       let utterance = new SpeechSynthesisUtterance('');
        //       speechSynthesis.speak(utterance);
        //       voices = speechSynthesis.getVoices();
        //     }
        //     return voices;
        //   }
        // }, []);
  
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
  
      if ('speechSynthesis' in window) {
        let voices = getVoices();
        let rate = 5,
            pitch = 1,
            volume = 0.5;
        let text = 'woohoo';
  
        speak(text, voices[9], rate, pitch, volume);
        }
  };

    return (
        <div> <Button onClick={handleClick} icon="pi pi-volume-up" severity="secondary"/> </div>
    );
};