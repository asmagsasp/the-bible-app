// INTEGRAÇÃO COM RECURSOS NATIVOS DO CAPACITOR (ANDROID & IOS)

import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Toast } from '@capacitor/toast';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export async function initNativeFeatures() {
  try {
    // Esconde a Splash Screen nativa após a inicialização
    await SplashScreen.hide();
    
    // Configura a barra de status transparente/escura no Android e iOS
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#0f172a' });
  } catch (e) {
    console.log('Ambiente Web / PWA:', e.message);
  }
}

export async function triggerHapticFeedback() {
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch (e) {
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  }
}

export async function shareContent(title, text, url) {
  try {
    await Share.share({
      title: title || 'Bíblia Sagrada Ave Maria',
      text: text,
      url: url || 'https://bibliasagradaavemaria.com.br',
      dialogTitle: 'Compartilhar Palavra de Deus'
    });
  } catch (e) {
    if (navigator.share) {
      navigator.share({
        title: title || 'Bíblia Sagrada Ave Maria',
        text: text,
        url: url || 'https://bibliasagradaavemaria.com.br'
      }).catch(() => {});
    } else {
      // Fallback para cópia no clipboard
      navigator.clipboard.writeText(`${text}\n\n${url || ''}`);
      showNativeToast('Texto copiado para a área de transferência!');
    }
  }
}

export async function showNativeToast(message) {
  try {
    await Toast.show({
      text: message,
      duration: 'short',
      position: 'bottom'
    });
  } catch (e) {
    const toastEl = document.getElementById('toast');
    if (toastEl) {
      toastEl.textContent = message;
      toastEl.classList.add('show');
      setTimeout(() => toastEl.classList.remove('show'), 2500);
    }
  }
}
