// import React, { useEffect } from 'react';

// const TextToSpeech = () => {
//     useEffect(() => {
//       function getVoices() {
//         let voices = speechSynthesis.getVoices();
//         if (!voices.length) {
//           let utterance = new SpeechSynthesisUtterance('');
//           speechSynthesis.speak(utterance);
//           voices = speechSynthesis.getVoices();
//         }
//         return voices;
//       }
  
//       function speak(text, voice, rate, pitch, volume) {
//         let speakData = new SpeechSynthesisUtterance();
//         speakData.volume = 0.5; // From 0 to 1
//         speakData.rate = 0.1; // From 0.1 to 10
//         speakData.pitch = 1; // From 0 to 2
//         speakData.text = text;
//         speakData.lang = 'en';
//         speakData.voice = voice;
  
//         speechSynthesis.speak(speakData);
//       }
  
//       if ('speechSynthesis' in window) {
//         let voices = getVoices();
//         let rate = 5,
//           pitch = 1,
//           volume = 0.5;
//         let text = 'Speaking with volume = 1 rate = 1 pitch = 2 ';
  
//         speak(text, voices[5], rate, pitch, volume);
  
//         setTimeout(() => {
//           rate = 5;
//           pitch = 1;
//           volume = 0.5;
//           text = 'Speaking with volume = 0.5 rate = 0.5 pitch = 1.5 ';
//           speak(text, voices[10], rate, pitch, volume);
//         }, 2000);
//       } else {
//         console.log('Speech Synthesis Not Supported 😞');
//       }
//     }, []);
//   };
  
//   export default TextToSpeech;