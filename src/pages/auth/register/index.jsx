import { Link, Stack, Typography, useTheme } from "@mui/material";
import { Link as RRDLink } from "react-router-dom";

import useLocales from "../../../hooks/useLocales";

import Register from "../../../sections/auth/register";
import SocialButtons from "../../../sections/auth/SocialButtons";

const RegisterPage = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { translate, currentLang } = useLocales();

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="h4">
          {translate("Get started with Tawk")}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography variant="body2">
            {translate("Already have an Account")}
          </Typography>
          <Link
            sx={{
              typography: "subtitle2",
              color: mode === "dark" ? "info.light" : "info.main",
            }}
            component={RRDLink}
            to="/auth/login"
          >
            {translate("Sign in")}
          </Link>
        </Stack>
      </Stack>
      <Register />
      <Typography
        component={"div"}
        variant="caption"
        textAlign="center"
        sx={{
          color: mode === "dark" ? "grey.400" : "grey.600",
        }}
      >
        {translate("By signing up, i agree to")}{" "}
        <Link
          underline="always"
          sx={{
            color: mode === "dark" ? "grey.200" : "grey.700",
            textDecorationColor:
              mode === "light"
                ? theme.palette.grey[600]
                : theme.palette.grey[400],
          }}
          component={RRDLink}
          to=""
        >
          {translate("Terms of service")}{" "}
        </Link>
        {translate("and")}{" "}
        <Link
          underline="always"
          sx={{
            color: mode === "dark" ? "grey.200" : "grey.700",
            textDecorationColor:
              mode === "light"
                ? theme.palette.grey[600]
                : theme.palette.grey[400],
          }}
          component={RRDLink}
          to=""
        >
          {translate("Privacy policy")}
        </Link>{" "}
        {currentLang.value === "fa" && translate("i agree")}
      </Typography>
      <SocialButtons />
    </Stack>
  );
};

export default RegisterPage;
