import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from 'i18next';

function EnglishFlag() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="12">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function FrenchFlag() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="24" height="12">
      <path fill="#EC1920" d="M0 0h3v2H0z" />
      <path fill="#fff" d="M0 0h2v2H0z" />
      <path fill="#051440" d="M0 0h1v2H0z" />
    </svg>
  );
}

function MoroccanFlag() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="24" height="16">
      <rect width="900" height="600" fill="#c1272d"/>
      <path d="M450 191.459l-70.534 217.082 184.661-134.164H335.873l184.661 134.164z" fill="none" stroke="#006233" strokeWidth="36"/>
    </svg>
  );
}

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    const languages = ['en', 'fr', 'ar'];
    const currentIndex = languages.indexOf(language);
    const newLanguage = languages[(currentIndex + 1) % languages.length];
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('pongLanguage', newLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('pongLanguage');
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const getFlag = () => {
    switch (language) {
      case 'en':
        return <EnglishFlag />;
      case 'fr':
        return <FrenchFlag />;
      case 'ar':
        return <MoroccanFlag />;
      default:
        return <EnglishFlag />;
    }
  };

  const getLanguageName = () => {
    switch (language) {
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      case 'ar':
        return 'العربية';
      default:
        return 'English';
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-32 h-10 relative overflow-hidden rounded-md bg-secondaryColor"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center gap-2 absolute inset-0"
        >
          {getFlag()}
          <span className="text-sm font-medium">
            {getLanguageName()}
          </span>
        </motion.div>
      </AnimatePresence>
    </button>
  );
}