// SERVIÇO DE ÁUDIO ROBUTO COM DIVISÃO DE FRASES (TEXT CHUNKING) E SUPORTE COMPLETO A ANDROID E IOS

import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { showNativeToast } from './nativeService.js';

let isPlaying = false;
let shouldStop = false;
let currentAudio = null;

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

// DIVISOR INTELIGENTE DE TEXTO LONGO EM FRASES CURTAS PARA ANDROID/IOS
function splitTextIntoChunks(text, maxChunkLen = 180) {
  const clean = text.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return [];

  // Divide por pontuação ou trechos curtos
  const sentences = clean.match(/[^.!?;:]+[.!?;:]+/g) || [clean];
  const chunks = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + ' ' + sentence).length > maxChunkLen) {
      if (current.trim()) chunks.push(current.trim());
      current = sentence;
    } else {
      current += ' ' + sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.length > 0 ? chunks : [clean];
}

// REPRODUÇÃO DE ÁUDIO POR BLOCOS DE FRASES
export async function speakText(text, onEndCallback, onProgressCallback) {
  stopAudio();
  shouldStop = false;
  isPlaying = true;

  const chunks = splitTextIntoChunks(text);
  if (chunks.length === 0) {
    isPlaying = false;
    if (onEndCallback) onEndCallback();
    return false;
  }

  for (let i = 0; i < chunks.length; i++) {
    if (shouldStop) break;

    const chunk = chunks[i];
    if (onProgressCallback) {
      onProgressCallback(i + 1, chunks.length, chunk);
    }

    const success = await playSingleChunk(chunk);
    if (!success || shouldStop) break;
  }

  isPlaying = false;
  if (onEndCallback) onEndCallback();
  return true;
}

// REPRODUZ UM ÚNICO BLOCO COM MULTI-MOTOR (CAPACITOR NATIVE -> WEBSPEECH -> STREAMELEMENTS)
async function playSingleChunk(chunkText) {
  if (shouldStop) return false;

  // 1. TENTA CAPACITOR NATIVE TEXT-TO-SPEECH
  try {
    await TextToSpeech.speak({
      text: chunkText,
      lang: 'pt-BR',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient'
    });
    return true;
  } catch (errNative) {
    console.log('TTS Nativo indisponível para o trecho, tentando WebSpeech...', errNative);
  }

  if (shouldStop) return false;

  // 2. TENTA SPEECH SYNTHESIS NAVEGADOR
  if ('speechSynthesis' in window && window.speechSynthesis) {
    try {
      const isOk = await new Promise((resolve) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(chunkText);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.95;

        utterance.onend = () => resolve(true);
        utterance.onerror = () => resolve(false);

        // Timeout de segurança
        const timer = setTimeout(() => {
          window.speechSynthesis.cancel();
          resolve(false);
        }, 12000);

        window.speechSynthesis.speak(utterance);
      });

      if (isOk) return true;
    } catch (e) {
      console.log('WebSpeech error:', e);
    }
  }

  if (shouldStop) return false;

  // 3. FALLBACK DE ÁUDIO STREAMELEMENTS (HD AUDIO STREAM)
  return new Promise((resolve) => {
    try {
      const encoded = encodeURIComponent(chunkText);
      const audioUrl = `https://api.streamelements.com/kappa/v2/speech?voice=Vitoria&text=${encoded}`;
      
      currentAudio = new Audio(audioUrl);
      currentAudio.play().catch(() => resolve(false));

      currentAudio.onended = () => resolve(true);
      currentAudio.onerror = () => resolve(false);
    } catch (e) {
      resolve(false);
    }
  });
}

export function stopAudio() {
  shouldStop = true;
  isPlaying = false;

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
}

export function isAudioPlaying() {
  return isPlaying;
}
