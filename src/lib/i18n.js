export async function getTranslator(locale) {
  try {
    // Dynamically import the translation file for the given locale
    const translations = await import(`../locales/${locale}.json`).then(module => module.default);
    return translations;
  } catch (error) {
    console.error(`Failed to load translations for locale "${locale}":`, error);
    // Fallback to English if translation file is not found
    try {
      const fallbackTranslations = await import('../locales/en.json').then(module => module.default);
      return fallbackTranslations;
    } catch (fallbackError) {
      console.error('Failed to load fallback English translations:', fallbackError);
      // Return an empty object or basic defaults if fallback also fails
      return {};
    }
  }
}
