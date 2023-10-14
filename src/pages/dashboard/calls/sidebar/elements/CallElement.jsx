import {
  Box,
  Stack,
  Typography,
  useTheme,
  Avatar,
  IconButton,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { Phone, VideoCamera } from "phosphor-react";

const CallLogElement = ({ data }) => {
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
        <Stack
          direction="row"
          spacing={1}
          sx={{ minWidth: "0px", maxWidth: "25%" }}
        >
          <IconButton color="success">
            <Phone size={24} weight="regular" />
          </IconButton>
          <IconButton color="success">
            <VideoCamera size={24} weight="regular" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CallLogElement;
