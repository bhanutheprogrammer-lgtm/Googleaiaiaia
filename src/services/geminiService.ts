import { AIScanResult, LanguageCode } from '../types';

export interface AICraftAnalysisResult extends AIScanResult {
  isAuthenticCraft?: boolean;
}

/**
 * Sends craft image and vernacular context to Gemini Multimodal Vision API.
 * Uses full-stack server-side processing for secure API key handling.
 */
export async function analyzeCraftImageWithGemini(
  imageBase64: string,
  targetLanguage: string = 'te',
  voiceNotes: string = ''
): Promise<AICraftAnalysisResult> {
  try {
    const response = await fetch('/api/gemini/analyze-craft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64: imageBase64,
        imageUrl: imageBase64.startsWith('http') ? imageBase64 : undefined,
        selectedLanguage: targetLanguage,
        customNotes: voiceNotes,
        voiceNotes: voiceNotes,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI Vision Analysis server responded with status: ${response.status}`);
    }

    const data: AICraftAnalysisResult = await response.json();
    return data;
  } catch (error) {
    console.error('Gemini Vision AI Analysis Error:', error);
    throw error;
  }
}
