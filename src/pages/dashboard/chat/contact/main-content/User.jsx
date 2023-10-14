import {
  Stack,
  Avatar,
  Typography,
  Box,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { VideoCamera, Phone } from "phosphor-react";

const data = [
  {
    title: "Camera",
    icon: <VideoCamera size={25} />,
  },
  {
    title: "Audio",
    icon: <Phone size={25} />,
  },
];

const User = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Stack direction="column" px={3} spacing={2} width="100%">
      <Stack direction="row" spacing={3} alignItems="center" width="100%">
        <Avatar
          src={faker.image.avatar()}
          alt={faker.name.fullName()}
          sx={{
            width: 80,
            height: 80,
          }}
        />
        <Stack direction="column" spacing={1}>
          <Typography variant="body1" fontWeight="600">
            Lee Willms
          </Typography>
          <Typography variant="body1">1-978-546-3716</Typography>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        {data.map((item, index) => (
          <Button variant="text" key={index}>
            <Stack direction="column" spacing={0} alignItems="center">
              <Box
                sx={{
                  color: mode === "light" ? "grey.700" : "grey.200",
                }}
              >
                {item.icon}
              </Box>
              <Typography
                sx={{
                  color: mode === "light" ? "grey.700" : "grey.200",
                }}
                variant="body2"
                fontWeight="500"
              >
                {item.title}
              </Typography>
            </Stack>
          </Button>
        ))}
      </Stack>
      <Divider variant="fullWidth" />
    </Stack>
  );
};

export default User;
