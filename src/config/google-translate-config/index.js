import axios from "axios";
import { google_translate_api_keys } from "../../utils/constants";

const translationCache = new Map();

export const translateText = async (text, targetLanguage) => {
    const cacheKey = `${targetLanguage}_${text}`;
    if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey);
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${google_translate_api_keys}`;

    try {
        const response = await axios.post(url, {
            q: text,
            target: targetLanguage,
            key: google_translate_api_keys,
        });

        const translated = response?.data?.data?.translations[0]?.translatedText;
        if (translated) {
            translationCache.set(cacheKey, translated);
            return translated;
        } else {
            throw new Error("Translation failed");
        }
    } catch (error) {
        console.error("Translation error:", error.message);
        return text; // fallback to original
    }
};