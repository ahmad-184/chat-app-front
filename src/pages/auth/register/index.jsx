import { Link, Stack, Typography, useTheme } from "@mui/material";
import { Link as RRDLink } from "react-router-dom";

import Register from "../../../sections/auth/register";
import SocialButtons from "../../../sections/auth/SocialButtons";

const RegisterPage = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="h4">Get started with Tawk</Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography variant="body2">Already have an Account?</Typography>
          <Link
            sx={{
              typography: "subtitle2",
              color: mode === "dark" ? "info.light" : "info.main",
            }}
            component={RRDLink}
            to="/auth/login"
          >
            Sign in
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
        {"By signing up, i agree to "}
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
          Terms of service{" "}
        </Link>
        {"and "}
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
          Privacy policy
        </Link>
      </Typography>
      <SocialButtons />
    </Stack>
  );
};

export default RegisterPage;
