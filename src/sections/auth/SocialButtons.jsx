import { Stack, Divider, IconButton, useTheme } from "@mui/material";
import { GoogleLogo, GithubLogo, TwitterLogo } from "phosphor-react";

import useLocales from "../../hooks/useLocales";

const list = [
  {
    icon: <GoogleLogo size={26} />,
    color: {
      dark: "error.light",
      light: "error.main",
    },
  },
  {
    icon: <GithubLogo size={26} />,
    color: {
      dark: "grey.500",
      light: "grey.800",
    },
  },
  {
    icon: <TwitterLogo size={26} />,
    color: {
      dark: "info.light",
      light: "info.main",
    },
  },
];

const SocialButtons = () => {
  const mode = useTheme().palette.mode;

  const { translate } = useLocales();

  return (
    <Stack spacing={2.5} pb={2}>
      <Divider
        variant="fullWidth"
        sx={{
          pt: 2.5,
          typography: "caption",
          color: mode === "light" ? "grey.500" : "grey.400",
          "&::after,::before": {
            borderTop: "1px dashed",
            borderColor: mode === "light" ? "grey.400" : "grey.700",
          },
        }}
      >
        {translate("OR")}
      </Divider>
      <Stack direction="row" spacing={2} justifyContent="center">
        {list.map(({ icon, color: { dark, light } }, index) => (
          <IconButton
            key={index}
            sx={{
              color: mode === "light" ? light : dark,
            }}
          >
            {icon}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );
};

export default SocialButtons;
