// @mui
import { enUS, faIR } from "@mui/material/locale";

// routes
import { PATH_DASHBOARD } from "./routes/paths";

export const API_BASE_URL = "http://localhost:9000/api";

export const SECRET_KEY = "1v%nPCJG%dJtx3E'VQL@W^-85=DV!4";

export const CLOUD_SECRET = "ZUetiwl_NLkvBatoktVvDCJycd4";

export const CLOUD_PRESET_NAME = "m6tpa2jf";

export const CLOUD_NAME = "dnlnbcbt0";

export const UPLOAD_FOLDER = "Tawk";

export const defaultSettings = {
  themeMode: "light",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "horizontal",
  themeColorPresets: "default",
  themeStretch: false,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

if (!window.localStorage.getItem("lang")) {
  window.localStorage.setItem("lang", "en");
}

export const allLangs = (translate) => [
  {
    label: translate("English"),
    value: "en",
    systemValue: enUS,
    icon: "https://flagcdn.com/h40/us.png",
  },
  {
    label: translate("Persian"),
    value: "fa",
    systemValue: faIR,
    // icon: "https://flagcdn.com/h40/ir.png",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/State_flag_of_Iran_1964-1980.svg/800px-State_flag_of_Iran_1964-1980.svg.png",
  },
];

// DEFAULT ROOT PATH
export const DEFAULT_PATH = PATH_DASHBOARD.general.app; // as '/app'
