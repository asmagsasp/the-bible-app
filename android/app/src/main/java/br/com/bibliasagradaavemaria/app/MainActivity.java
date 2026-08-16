package br.com.bibliasagradaavemaria.app;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import java.util.Locale;

public class MainActivity extends BridgeActivity {
    private TextToSpeech tts;
    private boolean isTtsReady = false;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        try {
            // Inicializa o motor NATIVO de voz do Android em Java
            tts = new TextToSpeech(this, status -> {
                if (status == TextToSpeech.SUCCESS) {
                    int result = tts.setLanguage(new Locale("pt", "BR"));
                    if (result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED) {
                        isTtsReady = true;
                    }
                }
            });

            if (this.bridge != null && this.bridge.getWebView() != null) {
                WebView webView = this.bridge.getWebView();
                WebSettings settings = webView.getSettings();
                settings.setMediaPlaybackRequiresUserGesture(false);
                settings.setJavaScriptEnabled(true);
                settings.setDomStorageEnabled(true);
                settings.setAllowFileAccess(true);
                settings.setAllowContentAccess(true);

                // Injeta a interface nativa window.NativeTTS no Javascript
                webView.addJavascriptInterface(new NativeTTSBridge(), "NativeTTS");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public class NativeTTSBridge {
        @JavascriptInterface
        public void speak(String text) {
            speakWithLang(text, "pt");
        }

        @JavascriptInterface
        public void speakWithLang(String text, String lang) {
            if (tts != null && text != null) {
                Locale locale = new Locale("pt", "BR");
                if ("en".equalsIgnoreCase(lang)) {
                    locale = new Locale("en", "US");
                } else if ("es".equalsIgnoreCase(lang)) {
                    locale = new Locale("es", "ES");
                }

                tts.setLanguage(locale);
                tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "BibliaUtterance_" + System.currentTimeMillis());
            }
        }

        @JavascriptInterface
        public void stop() {
            if (tts != null) {
                tts.stop();
            }
        }
    }

    @Override
    public void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        super.onDestroy();
    }
}
