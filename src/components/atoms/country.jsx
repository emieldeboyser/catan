import React, { useState, useRef, useEffect } from "react";
import { GB } from "country-flag-icons/react/3x2";
import { BE } from "country-flag-icons/react/3x2";
import { FR } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

const LanguageSelector = ({ currentLanguage }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English", flag: <GB /> },
    { code: "fr", label: "Français", flag: <FR /> },
    { code: "be", label: "Vloams", flag: <BE /> },
  ];

  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  const getCurrentLanguage = () => {
    const current = languages.find((lang) => lang.code === currentLanguage);
    return current ? current.flag : <GB />;
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 p-2 border rounded"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {getCurrentLanguage()}
        <span>{currentLanguage.toUpperCase()}</span>
      </button>
      {isOpen && (
        <ul
          className="absolute mt-2 bg-white border rounded shadow"
          role="listbox"
        >
          {languages.map(({ code, label, flag }) => (
            <li
              key={code}
              onClick={() => onChangeLanguage(code)}
              className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100"
              role="option"
              aria-selected={currentLanguage === code}
            >
              {flag}
              <span>{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
