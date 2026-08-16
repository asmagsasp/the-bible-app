// SERVIÇO DE HOMILIA E ÁUDIO TRILÍNGUE (PT, EN, ES)

import { getLanguage, t } from './i18n.js';
import { showNativeToast } from './nativeService.js';

let isPlaying = false;
let shouldStop = false;
let currentAudio = null;

export function getAIHomilyReflection(ref, verseText) {
  const lang = getLanguage();
  const homilies = {
    pt: {
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
        <p>Que a Graça de Nosso Senhor Jesus Cristo e a intercessão de Nossa Senhora estejam com você hoje e sempre. Amém.</p>
      `
    },
    en: {
      title: "Spiritual Reflection with AI",
      reference: ref || "Psalms 23, 1-2",
      textExcerpt: verseText || "The Lord is my shepherd; I shall not want.",
      body: `
        <p>Dear brothers and sisters in Christ,</p>
        <p>The Word of God in <strong>${ref || 'Psalms 23'}</strong> invites us to renew our unwavering trust in Divine Care. Amid everyday trials and worries, Jesus reveals Himself as the Good Shepherd who leads us to restful waters and restores our soul.</p>
        <p style="margin-top: 10px;"><strong>How to apply in your daily life:</strong></p>
        <ul style="padding-left: 20px; margin-top: 6px; margin-bottom: 10px;">
          <li>Surrender your worries in morning prayer.</li>
          <li>Practice charity and patience with your neighbor.</li>
          <li>Take 5 minutes of silence to listen to God's voice.</li>
        </ul>
        <p>May the Grace of Our Lord Jesus Christ and Our Lady's intercession be with you always. Amen.</p>
      `
    },
    es: {
      title: "Reflexión Espiritual con IA",
      reference: ref || "Salmos 23, 1-2",
      textExcerpt: verseText || "El Señor es mi pastor, nada me falta.",
      body: `
        <p>Queridos hermanos y hermanas en Cristo,</p>
        <p>La Palabra de Dios en <strong>${ref || 'Salmos 23'}</strong> nos invita a renovar nuestra confianza inquebrantable en el Cuidado Divino. En medio de las tribulaciones diarias, Jesús se revela como el Buen Pastor que nos conduce a aguas de reposo y reconforta nuestra alma.</p>
        <p style="margin-top: 10px;"><strong>Cómo aplicarlo en tu vida diaria:</strong></p>
        <ul style="padding-left: 20px; margin-top: 6px; margin-bottom: 10px;">
          <li>Entrega tus preocupaciones en la oración matutina.</li>
          <li>Practica la caridad y la paciencia con tu prójimo.</li>
          <li>Tómate 5 minutos de silencio para escuchar la voz de Dios.</li>
        </ul>
        <p>Que la Gracia de Nuestro Señor Jesucristo y la intercesión de Nuestra Señora estén contigo siempre. Amén.</p>
      `
    }
  };

  return homilies[lang] || homilies.pt;
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

  const lang = getLanguage();
  const langTag = lang === 'en' ? 'en-US' : (lang === 'es' ? 'es-ES' : 'pt-BR');

  // 1. PONTE NATIVA JAVA ANDROID (NativeTTS)
  if (window.NativeTTS && typeof window.NativeTTS.speakWithLang === 'function') {
    try {
      window.NativeTTS.speakWithLang(cleanText, lang);
      showNativeToast(t('appTitle') + ' - Voice');
      
      setTimeout(() => {
        isPlaying = false;
        if (onEndCallback) onEndCallback();
      }, Math.max(3000, cleanText.length * 70));

      return true;
    } catch (e) {
      console.log('NativeTTS speakWithLang error:', e);
    }
  } else if (window.NativeTTS && typeof window.NativeTTS.speak === 'function') {
    try {
      window.NativeTTS.speak(cleanText);
      return true;
    } catch (e) {}
  }

  // 2. CHUNKS COM WEBSPEECH / STREAMELEMENTS MULTILÍNGUE
  const chunks = splitTextIntoChunks(cleanText);
  for (let i = 0; i < chunks.length; i++) {
    if (shouldStop) break;

    const chunk = chunks[i];
    if (onProgressCallback) {
      onProgressCallback(i + 1, chunks.length, chunk);
    }

    const success = await playAudioChunk(chunk, langTag, lang);
    if (!success || shouldStop) break;
  }

  isPlaying = false;
  if (onEndCallback) onEndCallback();
  return true;
}

function playAudioChunk(chunkText, langTag, lang) {
  return new Promise((resolve) => {
    if (shouldStop) return resolve(false);

    if ('speechSynthesis' in window && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(chunkText);
        utterance.lang = langTag;
        utterance.rate = 0.95;

        utterance.onend = () => resolve(true);
        utterance.onerror = () => resolve(false);

        setTimeout(() => resolve(true), 8000);
        window.speechSynthesis.speak(utterance);
        return;
      } catch (e) {}
    }

    const audioEl = document.getElementById('globalAudioPlayer');
    if (audioEl) {
      try {
        const encoded = encodeURIComponent(chunkText);
        const voice = lang === 'en' ? 'Brian' : (lang === 'es' ? 'Enrique' : 'Vitoria');
        audioEl.src = `https://api.streamelements.com/kappa/v2/speech?voice=${voice}&text=${encoded}`;
        
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
