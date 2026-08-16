// SERVIÇO DE ÁUDIO DE ALTA FIDELIDADE COM DIVISÃO DE FRASES (CHUNKING) E FALLBACK AUTOMÁTICO DE VOZ HD

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

// DIVIDE TEXTO LONGO EM FRASES CURTAS
function splitTextIntoChunks(text, maxChunkLen = 180) {
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

// REPRODUÇÃO SEQUENCIAL DE ÁUDIO POR BLOCOS
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

    const success = await playChunkWithFallback(chunk);
    if (!success || shouldStop) break;
  }

  isPlaying = false;
  if (onEndCallback) onEndCallback();
  return true;
}

// EXECUTA REPRODUÇÃO DE UM BLOCO DE FRASES
async function playChunkWithFallback(chunkText) {
  if (shouldStop) return false;

  // TENTA NAVEGADOR NATIVO (SPEECH SYNTHESIS) SE DISPONÍVEL
  if ('speechSynthesis' in window && window.speechSynthesis) {
    try {
      const ok = await new Promise((resolve) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(chunkText);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.95;

        utterance.onend = () => resolve(true);
        utterance.onerror = () => resolve(false);

        // Timeout de proteção
        const timer = setTimeout(() => {
          window.speechSynthesis.cancel();
          resolve(false);
        }, 10000);

        window.speechSynthesis.speak(utterance);
      });

      if (ok) return true;
    } catch (e) {
      console.log('WebSpeech error:', e);
    }
  }

  if (shouldStop) return false;

  // FALLBACK EM ÁUDIO STREAMING HD (STREAMELEMENTS PT-BR)
  return new Promise((resolve) => {
    try {
      const encoded = encodeURIComponent(chunkText);
      const audioUrl = `https://api.streamelements.com/kappa/v2/speech?voice=Vitoria&text=${encoded}`;
      
      currentAudio = new Audio(audioUrl);
      currentAudio.play().then(() => {
        isPlaying = true;
      }).catch(err => {
        console.log('Erro ao iniciar áudio:', err);
        resolve(false);
      });

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
