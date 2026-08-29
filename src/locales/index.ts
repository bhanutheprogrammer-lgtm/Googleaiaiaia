import { LanguageCode } from '../types';
import { TranslationSchema } from './types';
import { en } from './en';
import { hi } from './hi';
import {
  te,
  ta,
  kn,
  ml,
  mr,
  gu,
  bn,
  or as orLocale,
  pa,
  as as asLocale,
  kok,
  ne,
  mni,
  kha,
  lus,
  ur,
} from './otherLangs';

export const translations: Record<LanguageCode, TranslationSchema> = {
  te,
  en,
  hi,
  ta,
  kn,
  ml,
  mr,
  gu,
  bn,
  or: orLocale,
  pa,
  as: asLocale,
  kok,
  ne,
  mni,
  kha,
  lus,
  ur,
};

export function getTranslation(lang: LanguageCode): TranslationSchema {
  return translations[lang] || translations.en;
}

export * from './types';

