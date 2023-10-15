import { Stack, Typography, Link, useTheme, Box } from "@mui/material";
import { Link as RRDLink } from "react-router-dom";
import { CaretLeft, CaretRight } from "phosphor-react";

import ResetPassword from "../../../sections/auth/reset-password";

import useLocales from "../../../hooks/useLocales";
import useSettings from "../../../hooks/useSettings";

const ResetPasswordPage = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { translate } = useLocales();
  const { themeDirection } = useSettings();

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="h3" pb={1}>
          {translate("Reset Password")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: mode === "light" ? "grey.700" : "grey.300",
          }}
        >
          {translate("Please set your new password")}
        </Typography>
      </Stack>
      <ResetPassword />
      <Stack spacing={0.3} alignItems="center" direction="row">
        <Box
          display="flex"
          sx={{
            color: mode === "dark" ? "grey.400" : "grey.700",
          }}
        >
          {themeDirection === "ltr" ? (
            <CaretLeft size={14} weight="bold" />
          ) : (
            <CaretRight size={14} weight="bold" />
          )}
        </Box>
        <Link
          sx={{
            typography: "caption",
            color: mode === "dark" ? "grey.400" : "grey.700",
            textDecorationColor:
              mode === "light"
                ? `${theme.palette.grey[500]} !important`
                : `${theme.palette.grey[400]} !important`,
          }}
          component={RRDLink}
          to="/auth/login"
        >
          {translate("Return to sign in")}
        </Link>
      </Stack>
    </Stack>
  );
};

export default ResetPasswordPage;
