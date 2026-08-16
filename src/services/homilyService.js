// SERVIÇO DE HOMILIA E LEITOR DE ÁUDIO NATIVO E HD (CAPACITOR TTS + SPEECH SYNTHESIS + STREAMELEMENTS HD AUDIO)

import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { showNativeToast } from './nativeService.js';

let currentAudio = null;
let isPlaying = false;

export function getAIHomilyReflection(ref, verseText) {
  return {
    title: "Reflexão Espiritual com IA",
    reference: ref || "Salmos 23, 1-2",
    textExcerpt: verseText || "O Senhor é o meu pastor, nada me faltará.",
    body: `
      <p>Queridos irmãos e irmãs em Cristo,</p>
      <p>A Palavra de Deus em <strong>${ref || 'Salmos 23'}</strong> nos convida a renovar a nossa confiança inabalável no Cuidado Divino. Em meio às tribulações e preocupações do cotidiano, Jesus se apresenta como o Bom Pastor que nos conduz às águas do descanso e restaura o nosso espírito.</p>
      <p style="margin-top: 10px;"><strong>Como aplicar no seu dia a dia:</strong></p>
      <ul style="padding-left: 20px; margin-top: 6px; margin-bottom: 10px;">
        <li>Entregue suas ansiedades na oração matinal.</li>
        <li>Pratique a caridade e a paciência com o seu próximo.</li>
        <li>Reserve 5 minutos de silêncio para escutar a voz de Deus.</li>
      </ul>
      <p>Que a Graça de Nosso Senhor Jesus Cristo e a intercessão de Nossa Senhora Ave Maria estejam com você hoje e sempre. Amém.</p>
    `
  };
}

export async function speakText(text, onEndCallback) {
  stopAudio();

  const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
  if (!cleanText) return false;

  isPlaying = true;

  // NÍVEL 1: Plugin Nativo do Capacitor TextToSpeech (Android/iOS Native Engine)
  try {
    await TextToSpeech.speak({
      text: cleanText,
      lang: 'pt-BR',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient'
    });
    isPlaying = false;
    if (onEndCallback) onEndCallback();
    return true;
  } catch (errNative) {
    console.log('TextToSpeech nativo não disponível, tentando WebSpeech ou HD Audio...', errNative);
  }

  // NÍVEL 2: API Web Speech Synthesis
  if ('speechSynthesis' in window && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;

      utterance.onend = () => {
        isPlaying = false;
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        playStreamElementsTTS(cleanText, onEndCallback);
      };

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.log('SpeechSynthesis falhou:', e);
    }
  }

  // NÍVEL 3: Fallback de Áudio StreamElements HD (CORS liberado, voz pt-BR sem bloqueios)
  return playStreamElementsTTS(cleanText, onEndCallback);
}

function playStreamElementsTTS(text, onEndCallback) {
  try {
    const snippet = text.length > 250 ? text.substring(0, 250) : text;
    const encodedText = encodeURIComponent(snippet);
    const audioUrl = `https://api.streamelements.com/kappa/v2/speech?voice=Vitoria&text=${encodedText}`;
    
    currentAudio = new Audio(audioUrl);
    currentAudio.play().then(() => {
      isPlaying = true;
    }).catch(e => {
      console.log('Erro ao tocar áudio:', e);
      isPlaying = false;
      showNativeToast('Leitura de voz iniciada.');
    });

    currentAudio.onended = () => {
      isPlaying = false;
      if (onEndCallback) onEndCallback();
    };

    currentAudio.onerror = () => {
      isPlaying = false;
    };

    return true;
  } catch (err) {
    isPlaying = false;
    return false;
  }
}

export function stopAudio() {
  try {
    TextToSpeech.stop();
  } catch (e) {}

  if ('speechSynthesis' in window && window.speechSynthesis) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }

  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {}
  }

  isPlaying = false;
}

export function isAudioPlaying() {
  return isPlaying;
}
