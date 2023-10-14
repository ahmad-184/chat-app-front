import { Box, Stack, Typography, useTheme, Avatar } from "@mui/material";
import { faker } from "@faker-js/faker";
import { ArrowUpRight, Phone, ArrowDownLeft } from "phosphor-react";

const CallElement = ({ data }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      sx={{
        backgroundColor: mode === "light" ? "grey.50" : "grey.900",
        width: "100%",
        p: 2,
        borderRadius: 2,
        cursor: "pointer",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ minWidth: "0px", maxWidth: "83%" }}
        >
          <Avatar src={faker.image.avatar()} alt="user profile picture" />
          <Stack direction="column" sx={{ minWidth: "0px" }}>
            <Typography variant="body1" fontWeight="600" noWrap>
              {data.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  color: data.missed ? "error.main" : "success.main",
                }}
              >
                {data.incoming ? (
                  <ArrowDownLeft size={15} weight="bold" />
                ) : (
                  <ArrowUpRight size={15} weight="bold" />
                )}
              </Box>
              <Typography
                variant="caption"
                color={mode === "light" ? "grey.600" : "grey.400"}
                noWrap
              >
                {data.date}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ minWidth: "0px", maxWidth: "25%" }}>
          <Box sx={{ color: "success.main" }}>
            <Phone size={22} weight="regular" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CallElement;
