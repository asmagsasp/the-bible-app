// SERVIÇO DE ÁUDIO NATIVO JAVA + WEBSPEECH + HTML5 AUDIO

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

export function unlockAudioContext() {
  const audioEl = document.getElementById('globalAudioPlayer');
  if (audioEl) {
    try {
      audioEl.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      audioEl.play().catch(() => {});
    } catch (e) {}
  }
}

// DIVIDE TEXTO EM FRASES CURTAS
function splitTextIntoChunks(text, maxChunkLen = 140) {
  const clean = text.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return [];

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

// REPRODUÇÃO DE ÁUDIO ROBUTA
export async function speakText(text, onEndCallback, onProgressCallback) {
  stopAudio();
  unlockAudioContext();
  
  shouldStop = false;
  isPlaying = true;

  const cleanText = text.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
  if (!cleanText) {
    isPlaying = false;
    if (onEndCallback) onEndCallback();
    return false;
  }

  // NÍVEL 1: SE A PONTE NATIVA JAVA window.NativeTTS EXISTIR (ANDROID NATIVO)
  if (window.NativeTTS && typeof window.NativeTTS.speak === 'function') {
    try {
      window.NativeTTS.speak(cleanText);
      showNativeToast('Iniciando leitura por voz...');
      
      // Simula progresso e encerramento
      setTimeout(() => {
        isPlaying = false;
        if (onEndCallback) onEndCallback();
      }, Math.max(3000, cleanText.length * 70));

      return true;
    } catch (e) {
      console.log('NativeTTS error:', e);
    }
  }

  // NÍVEL 2: REPRODUÇÃO EM CHUNKS (WEBSPEECH / STREAMELEMENTS)
  const chunks = splitTextIntoChunks(cleanText);
  for (let i = 0; i < chunks.length; i++) {
    if (shouldStop) break;

    const chunk = chunks[i];
    if (onProgressCallback) {
      onProgressCallback(i + 1, chunks.length, chunk);
    }

    const success = await playAudioChunk(chunk);
    if (!success || shouldStop) break;
  }

  isPlaying = false;
  if (onEndCallback) onEndCallback();
  return true;
}

function playAudioChunk(chunkText) {
  return new Promise((resolve) => {
    if (shouldStop) return resolve(false);

    // Tenta WebSpeech API
    if ('speechSynthesis' in window && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(chunkText);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.95;

        utterance.onend = () => resolve(true);
        utterance.onerror = () => resolve(false);

        setTimeout(() => resolve(true), 8000);
        window.speechSynthesis.speak(utterance);
        return;
      } catch (e) {}
    }

    // Tenta elemento DOM audio
    const audioEl = document.getElementById('globalAudioPlayer');
    if (audioEl) {
      try {
        const encoded = encodeURIComponent(chunkText);
        audioEl.src = `https://api.streamelements.com/kappa/v2/speech?voice=Vitoria&text=${encoded}`;
        
        audioEl.onended = () => resolve(true);
        audioEl.onerror = () => resolve(false);

        audioEl.play().catch(() => resolve(false));
        setTimeout(() => resolve(true), 10000);
        return;
      } catch (e) {}
    }

    resolve(false);
  });
}

export function stopAudio() {
  shouldStop = true;
  isPlaying = false;

  if (window.NativeTTS && typeof window.NativeTTS.stop === 'function') {
    try { window.NativeTTS.stop(); } catch (e) {}
  }

  if ('speechSynthesis' in window && window.speechSynthesis) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }

  const audioEl = document.getElementById('globalAudioPlayer');
  if (audioEl) {
    try {
      audioEl.pause();
      audioEl.currentTime = 0;
    } catch (e) {}
  }
}

export function isAudioPlaying() {
  return isPlaying;
}
