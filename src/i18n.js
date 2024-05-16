import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Detecta o idioma do navegador
  .use(initReactI18next) // Passa o i18n para o react-i18next
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          // Outros textos em inglês
        }
      },
      es: {
        translation: {
          welcome: "Bienvenido",
          // Outros textos em espanhol
        }
      },
      pt: {
        translation: {
          welcome: "Bem-vindo",
          // Outros textos em português
        }
      },
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React já faz a escapada
    }
  });

export default i18n;
