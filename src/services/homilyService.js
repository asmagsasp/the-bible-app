// SERVIÇO DE ÁUDIO BULLETPROOF COM DESBLOQUEIO DE TOCADOR E MULTI-SERVIDORES PT-BR

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

// DESBLOQUEIO DE ÁUDIO NO TOQUE DIRETO DO USUÁRIO
export function unlockAudioContext() {
  const audioEl = document.getElementById('globalAudioPlayer');
  if (audioEl) {
    try {
      // Pequeno som silencioso de ativação
      audioEl.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      audioEl.play().catch(() => {});
    } catch (e) {}
  }
}

// DIVISAO DE TEXTO EM TRECHOS CURTOS (100 A 150 CARACTERES)
function splitTextIntoChunks(text, maxChunkLen = 130) {
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

// REPRODUÇÃO SEQUENCIAL GARANTIDA
export async function speakText(text, onEndCallback, onProgressCallback) {
  stopAudio();
  unlockAudioContext();
  
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

    const success = await playAudioChunkWithMultiServer(chunk);
    if (!success || shouldStop) break;
  }

  isPlaying = false;
  if (onEndCallback) onEndCallback();
  return true;
}

// OBTÉM SERVIDORES DE ÁUDIO TTS PT-BR
function getTTSUrls(text) {
  const encoded = encodeURIComponent(text);
  return [
    `https://api.streamelements.com/kappa/v2/speech?voice=Vitoria&text=${encoded}`,
    `https://translate.google.com/translate_tts?ie=UTF-8&tl=pt&client=tw-ob&q=${encoded}`
  ];
}

// TOCA UM BLOCO TENTANDO MULTI-SERVIDORES DE ÁUDIO NO ELEMENTO DOM
function playAudioChunkWithMultiServer(chunkText) {
  return new Promise((resolve) => {
    if (shouldStop) return resolve(false);

    const audioEl = document.getElementById('globalAudioPlayer');
    const urls = getTTSUrls(chunkText);
    let urlIndex = 0;

    const tryNextUrl = () => {
      if (shouldStop || urlIndex >= urls.length) {
        // Se todos os servidores falharem, tenta síntese de voz como último recurso
        tryWebSpeech(chunkText).then(resolve);
        return;
      }

      const currentUrl = urls[urlIndex++];
      if (!audioEl) {
        currentAudio = new Audio(currentUrl);
        bindAudioEvents(currentAudio, resolve, tryNextUrl);
        currentAudio.play().catch(tryNextUrl);
      } else {
        audioEl.src = currentUrl;
        bindAudioEvents(audioEl, resolve, tryNextUrl);
        audioEl.play().catch(tryNextUrl);
      }
    };

    tryNextUrl();
  });
}

function bindAudioEvents(audioObj, onOk, onError) {
  let finished = false;

  const onEnded = () => {
    if (!finished) {
      finished = true;
      cleanup();
      onOk(true);
    }
  };

  const onErr = () => {
    if (!finished) {
      finished = true;
      cleanup();
      onError();
    }
  };

  const cleanup = () => {
    audioObj.removeEventListener('ended', onEnded);
    audioObj.removeEventListener('error', onErr);
  };

  audioObj.addEventListener('ended', onEnded);
  audioObj.addEventListener('error', onErr);

  // Timeout de 10 segundos por trecho
  setTimeout(() => {
    if (!finished) {
      finished = true;
      cleanup();
      onOk(true);
    }
  }, 10000);
}

// SÍNTESE DE VOZ COMO ÚLTIMO RECURSO
function tryWebSpeech(chunkText) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window) || !window.speechSynthesis) {
      return resolve(false);
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(chunkText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;

      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);

      setTimeout(() => resolve(true), 8000);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      resolve(false);
    }
  });
}

export function stopAudio() {
  shouldStop = true;
  isPlaying = false;

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
