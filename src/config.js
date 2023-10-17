// @mui
import { enUS, faIR } from "@mui/material/locale";

// routes
import { PATH_DASHBOARD } from "./routes/paths";

export const API_BASE_URL = "http://localhost:9000/api";

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

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    icon: "https://flagcdn.com/h40/us.png",
  },
  {
    label: "Persian",
    value: "fa",
    systemValue: faIR,
    // icon: "https://flagcdn.com/h40/ir.png",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/State_flag_of_Iran_1964-1980.svg/800px-State_flag_of_Iran_1964-1980.svg.png",
  },
];

export const defaultLang = allLangs[0]; // English

// DEFAULT ROOT PATH
export const DEFAULT_PATH = PATH_DASHBOARD.general.app; // as '/app'
