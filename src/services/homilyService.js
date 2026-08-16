// SERVIÇO DE HOMILIA / REFLEXÃO COM IA E REPRODUÇÃO DE ÁUDIO (SPEECH SYNTHESIS)

let synth = window.speechSynthesis;
let currentUtterance = null;
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
      <p>Que a Graça de Nosso Senhor Jesus Cristo e a intercessão de Nossa Senhora Ave Maria estejam com você hoje e sempre.</p>
    `
  };
}

export function speakText(text, onEndCallback) {
  if (!('speechSynthesis' in window)) {
    alert("Síntese de voz não suportada neste dispositivo.");
    return false;
  }

  stopAudio();

  // Limpa tags HTML para a voz
  const cleanText = text.replace(/<[^>]*>?/gm, '');

  currentUtterance = new SpeechSynthesisUtterance(cleanText);
  currentUtterance.lang = 'pt-BR';
  currentUtterance.rate = 0.95; // Velocidade de leitura agradável
  currentUtterance.pitch = 1.0;

  // Busca voz em Português se disponível
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
    isPlaying = false;
    if (onEndCallback) onEndCallback();
  };

  synth.speak(currentUtterance);
  isPlaying = true;
  return true;
}

export function stopAudio() {
  if (synth && synth.speaking) {
    synth.cancel();
  }
  isPlaying = false;
}

export function isAudioPlaying() {
  return isPlaying && synth && synth.speaking;
}
