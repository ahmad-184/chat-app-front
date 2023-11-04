import { Button, useTheme, Stack, Typography, Avatar } from "@mui/material";
import { faker } from "@faker-js/faker";
import { Prohibit, Trash } from "phosphor-react";

const Common = ({ handleOpenBlockDiagram, handleOpenDeleteDiagram }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Stack width="100%" px={3}>
      <Stack direction="column" spacing={3}>
        <Typography
          variant="body2"
          fontWeight={mode === "light" ? "600" : "400"}
          sx={{
            color: mode === "light" ? "grey.700" : "grey.300",
          }}
        >
          1 group common
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 47,
              height: 47,
            }}
            src={faker.image.avatar()}
            alt="user profile avatar"
          />
          <Stack direction="column">
            <Typography
              variant="body1"
              fontWeight={mode === "light" ? "700" : "500"}
              sx={{
                color: mode === "light" ? "grey.800" : "grey.200",
              }}
            >
              Camel's Gang
            </Typography>
            <Typography
              variant="body2"
              fontWeight={mode === "light" ? "500" : "300"}
              sx={{
                color: mode === "light" ? "grey.800" : "grey.300",
              }}
            >
              Owl, Parrot, Rabbit, you
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Button
            color="info"
            startIcon={<Prohibit size={25} />}
            size="large"
            variant="outlined"
            onClick={handleOpenBlockDiagram}
          >
            Block
          </Button>
          <Button
            color="info"
            startIcon={<Trash size={25} />}
            size="large"
            variant="outlined"
            onClick={handleOpenDeleteDiagram}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Common;
