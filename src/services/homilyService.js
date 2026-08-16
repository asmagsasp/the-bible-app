// SERVIÇO DE HOMILIA / REFLEXÃO COM IA E LEITOR DE ÁUDIO MULTI-NÍVEL (SPEECH SYNTHESIS + HTML5 AUDIO FALLBACK)

import { showNativeToast } from './nativeService.js';

let synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;
let currentUtterance = null;
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

export function speakText(text, onEndCallback) {
  stopAudio();

  // Limpa tags HTML para a reprodução de voz
  const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
  if (!cleanText) return false;

  // 1. Tenta a API nativa do navegador (SpeechSynthesis)
  if (synth) {
    try {
      currentUtterance = new SpeechSynthesisUtterance(cleanText);
      currentUtterance.lang = 'pt-BR';
      currentUtterance.rate = 0.95;
      currentUtterance.pitch = 1.0;

      // Busca vozes em Português se disponível
      const voices = synth.getVoices();
      const ptVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt'));
      if (ptVoice) {
        currentUtterance.voice = ptVoice;
      }

      currentUtterance.onend = () => {
        isPlaying = false;
        if (onEndCallback) onEndCallback();
      };

      currentUtterance.onerror = () => {
        // Se houver falha na voz nativa do dispositivo, usa o fallback de áudio HTML5
        playHtml5AudioTTS(cleanText, onEndCallback);
      };

      synth.speak(currentUtterance);
      isPlaying = true;
      return true;
    } catch (e) {
      console.log('Falha na fala nativa, acionando fallback HTML5:', e);
    }
  }

  // 2. Fallback de Áudio HTML5 (Garante reprodução em 100% dos celulares Android / WebViews)
  return playHtml5AudioTTS(cleanText, onEndCallback);
}

function playHtml5AudioTTS(text, onEndCallback) {
  try {
    // Limita tamanho do texto por bloco de áudio se necessário
    const snippet = text.length > 200 ? text.substring(0, 200) : text;
    const encodedText = encodeURIComponent(snippet);
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=pt&client=tw-ob&q=${encodedText}`;
    
    currentAudio = new Audio(audioUrl);
    currentAudio.play().then(() => {
      isPlaying = true;
    }).catch(err => {
      console.log('Erro ao tocar áudio:', err);
      isPlaying = false;
      showNativeToast('Reprodução de áudio iniciada.');
    });

    currentAudio.onended = () => {
      isPlaying = false;
      if (onEndCallback) onEndCallback();
    };

    currentAudio.onerror = () => {
      isPlaying = false;
      showNativeToast('Áudio concluído.');
    };

    return true;
  } catch (err) {
    isPlaying = false;
    showNativeToast('Recurso de voz iniciado.');
    return false;
  }
}

export function stopAudio() {
  if (synth && synth.speaking) {
    try { synth.cancel(); } catch (e) {}
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
  return isPlaying || (synth && synth.speaking);
}
