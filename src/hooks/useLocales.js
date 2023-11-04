import { useTranslation } from "react-i18next";
import useSettings from "./useSettings";
// config
import { allLangs as Langs } from "../config";

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  const { onChangeDirectionByLang } = useSettings();

  const langStorage = localStorage.getItem("i18nextLng");

  const allLangs = Langs(translate);

  const currentLang =
    allLangs.find((_lang) => _lang.value === langStorage) ||
    Langs(translate)[0];

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
    onChangeDirectionByLang(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text, options) => translate(text, options),
    currentLang,
    allLangs,
  };
}
