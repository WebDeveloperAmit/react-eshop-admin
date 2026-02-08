import { useTranslation } from "react-i18next";

const Footer = () => {

  const {t} = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bottom-page">
        <div className="body-text">{t("copyright")} © { currentYear }. {t("all_rights_reserved")}. {t("developed_by")} - {t("WebLayerSolutions")}</div>
      </div>
    </>
  )
}

export default Footer