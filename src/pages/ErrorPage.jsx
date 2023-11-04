import { useRouteError } from "react-router-dom";
import { Stack, Typography, Alert } from "@mui/material";

import useLocales from "../hooks/useLocales";

const ErrorPage = () => {
  const error = useRouteError();

  const { translate } = useLocales();

  return (
    <Stack
      width="100%"
      direction="column"
      spacing={2}
      sx={{
        alignItems: "center",
        p: 3,
        pt: "9vh",
      }}
      maxWidth="sm"
      mx="auto"
    >
      <Typography variant="h3">
        {translate("Oooops, Something bad happend")}
      </Typography>
      <Alert severity="error" variant="outlined">
        {translate("Error message")}: {error.message}
      </Alert>
    </Stack>
  );
};

export default ErrorPage;
