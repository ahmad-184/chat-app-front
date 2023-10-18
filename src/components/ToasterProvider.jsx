import { ToastContainer } from "react-toastify";

import useSettings from "../hooks/useSettings";

import { FONT_PRIMARY } from "../theme/typography";

export default function ToasterProvider() {
  const { themeDirection, themeMode } = useSettings();

  return (
    <ToastContainer
      position="top-center"
      theme={themeMode}
      rtl={themeDirection === "rtl" ? true : false}
      toastStyle={{
        fontFamily: FONT_PRIMARY,
      }}
    />
  );
}
