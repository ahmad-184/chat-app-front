import { Stack, Typography, useTheme, Box, Link } from "@mui/material";
import { Link as RRDLink } from "react-router-dom";
import { CaretLeft, CaretRight } from "phosphor-react";

import VerifyCode from "../../../sections/auth/verify-code";
import useLocales from "../../../hooks/useLocales";
import useSettings from "../../../hooks/useSettings";

const VerifyCodePage = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { translate } = useLocales();
  const { themeDirection } = useSettings();

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="h3">{translate("Verify account")}</Typography>
        <Typography variant="body1">
          {translate(
            "Please enter the 6-digit code sent to your email, verification code will expire after 10 minutes."
          )}
        </Typography>
      </Stack>
      <VerifyCode />
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
          to="/auth/register"
        >
          {translate("Back")}
        </Link>
      </Stack>
    </Stack>
  );
};

export default VerifyCodePage;
