import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const { i18n } = useTranslation(); // to access i18n instance for changing language

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change the language using i18n
    localStorage.setItem("lang", lang); // Save selected language to localStorage
  };

  return (
    <div className="popup-wrap language-switcher type-header">
      <div className="dropdown">
        <button
          className="lang-btn"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="icon-globe"></i>
          <span className="lang-text">
            {i18n.language === "bn" ? "BN" : "EN"}
          </span>
        </button>

        <ul className="dropdown-menu dropdown-menu-end lang-menu">
          <li>
            <button
              className={`dropdown-item ${i18n.language === "en" ? "active" : ""}`}
              onClick={() => changeLanguage("en")}
            >
              🇺🇸 <span>English</span>
            </button>
          </li>
          <li>
            <button
              className={`dropdown-item ${i18n.language === "bn" ? "active" : ""}`}
              onClick={() => changeLanguage("bn")}
            >
              🇧🇩 <span>বাংলা</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageDropdown;
