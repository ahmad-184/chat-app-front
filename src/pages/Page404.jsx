import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useLocales from "../hooks/useLocales";

const Page404 = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const navigate = useNavigate();

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
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: "90px",
            sm: "120px",
          },
        }}
      >
        {404}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: mode === "dark" ? "grey.300" : "grey.700",
        }}
      >
        {translate("Page that you look for not found")}
      </Typography>
      <Button variant="text" color="info" onClick={() => navigate("/")}>
        {translate("Back to Home")}
      </Button>
    </Stack>
  );
};

export default Page404;
