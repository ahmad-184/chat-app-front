import { Stack, Typography, Link, useTheme } from "@mui/material";
import { Link as RRDLink } from "react-router-dom";

import LoginForm from "../../../sections/auth/login";
import SocialButtons from "../../../sections/auth/SocialButtons";

import useLocales from "../../../hooks/useLocales";

const LoginPage = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { translate } = useLocales();

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="h4">{translate("Login to Tawk")}</Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography variant="body2">{translate("New user?")}</Typography>
          <Link
            sx={{
              typography: "subtitle2",
              color: mode === "dark" ? "info.light" : "info.main",
            }}
            component={RRDLink}
            to="/auth/register"
          >
            {translate("Create an Account")}
          </Link>
        </Stack>
      </Stack>
      <LoginForm />
      <SocialButtons />
    </Stack>
  );
};

export default LoginPage;
