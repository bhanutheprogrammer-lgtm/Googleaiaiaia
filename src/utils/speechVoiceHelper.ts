import { LanguageCode } from '../types';
import { getSpeechLangCode } from '../locales/tourTranslations';

let activeUtterance: SpeechSynthesisUtterance | null = null;

export const isSpeechAvailable = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
};

export const stopSpeech = () => {
  if (isSpeechAvailable()) {
    try {
      window.speechSynthesis.cancel();
      activeUtterance = null;
    } catch {
      // ignore
    }
  }
};

export const speakTourText = (
  text: string,
  lang: LanguageCode,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean => {
  if (!isSpeechAvailable()) {
    if (onEnd) onEnd();
    return false;
  }

  try {
    stopSpeech();

    const langCode = getSpeechLangCode(lang);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.92; // Slightly measured rate for low-literacy clarity
    utterance.pitch = 1.0;

    // Pick best matching voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const preferred = voices.find((v) => 
        v.lang === langCode || 
        v.lang.toLowerCase().replace('_', '-').startsWith(langCode.slice(0, 2))
      );
      if (preferred) {
        utterance.voice = preferred;
      }
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      activeUtterance = null;
      console.warn('SpeechSynthesis notice:', e);
      if (onError) onError(e);
      if (onEnd) onEnd();
    };

    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech execution error:', err);
    if (onError) onError(err);
    if (onEnd) onEnd();
    return false;
  }
};
