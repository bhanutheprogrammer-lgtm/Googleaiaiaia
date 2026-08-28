import { LanguageCode } from '../types';
import { TranslationSchema } from './types';
import { en } from './en';
import { hi } from './hi';
import { te, ta, bn, mr, gu, kn, ml, pa, or as orLocale, ur } from './otherLangs';

export const translations: Record<LanguageCode, TranslationSchema> = {
  en,
  hi,
  te,
  ta,
  bn,
  mr,
  gu,
  kn,
  ml,
  pa,
  or: orLocale,
  ur,
};

export function getTranslation(lang: LanguageCode): TranslationSchema {
  return translations[lang] || translations.en;
}

export * from './types';
