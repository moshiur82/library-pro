'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      bn: {
        translation: {
          "Dashboard": "ড্যাশবোর্ড",
          "All Books": "সব বই",
          "Add New Book": "নতুন বই যোগ করুন",
          "All Members": "সব সদস্য",
          "Add New Member": "নতুন সদস্য যোগ করুন",
          "All Borrows": "সব ধারের লিস্ট",
          "Borrow Book": "বই ধার নিন",
          "Borrow Form": "ধারের ফর্ম",
          "Select Book": "বই সিলেক্ট করুন",
          "Select Member": "সদস্য সিলেক্ট করুন",
          "Borrow": "ধার নিন",
          "Return Book": "বই ফেরত দিন",
          "Ongoing Borrows": "চলমান ধারের লিস্ট",
          "Return Now": "ফেরত দিন",
          "Success!": "সফল!",
          "New member added": "নতুন সদস্য যোগ হয়েছে",
          "New book added": "নতুন বই যোগ হয়েছে",
          "Book borrowed": "বই ধার নেওয়া হয়েছে",
          "Book returned": "বই ফেরত দেওয়া হয়েছে",
          "Error": "এরর",
          "Name and email required": "নাম এবং ইমেইল দরকার",
          "Select book and member": "বই এবং সদস্য সিলেক্ট করুন",
        }
      },
      en: {
        translation: {
          "Dashboard": "Dashboard",
          "All Books": "All Books",
          "Add New Book": "Add New Book",
          "All Members": "All Members",
          "Add New Member": "Add New Member",
          "All Borrows": "All Borrows",
          "Borrow Book": "Borrow Book",
          "Borrow Form": "Borrow Form",
          "Select Book": "Select Book",
          "Select Member": "Select Member",
          "Borrow": "Borrow",
          "Return Book": "Return Book",
          "Ongoing Borrows": "Ongoing Borrows",
          "Return Now": "Return Now",
          "Success!": "Success!",
          "New member added": "New member added",
          "New book added": "New book added",
          "Book borrowed": "Book borrowed",
          "Book returned": "Book returned",
          "Error": "Error",
          "Name and email required": "Name and email required",
          "Select book and member": "Select book and member",
        }
      }
    },
    fallbackLng: 'bn',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;