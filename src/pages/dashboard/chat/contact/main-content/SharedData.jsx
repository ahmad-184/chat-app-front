import {
  Stack,
  Divider,
  Typography,
  Box,
  useTheme,
  Button,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { CaretRight } from "phosphor-react";
import { useDispatch } from "react-redux";
import { updateSidebarType } from "../../../../../app/slices/app";

const SharedData = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const dispatch = useDispatch();

  return (
    <Stack direction="column" spacing={3} px={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="body1"
          fontWeight={mode === "light" ? "500" : "400"}
          sx={{
            color: mode === "light" ? "grey.800" : "grey.300",
          }}
        >
          Medias, links and docs
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Button
            sx={{
              color: mode === "light" ? "grey.700" : "grey.200",
              fontWeight: mode === "light" ? "600" : "500",
            }}
            endIcon={<CaretRight size={23} weight="regular" />}
            onClick={() => dispatch(updateSidebarType({ type: "SHARED" }))}
          >
            211
          </Button>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        pb={0.5}
      >
        {[...Array(3)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "80px",
              "& img": {
                width: "100%",
                height: "100%",
                borderRadius: "7px",
                objectFit: "cover",
              },
            }}
          >
            <img src={faker.image.avatar()} alt={faker.name.fullName()} />
          </Box>
        ))}
      </Stack>
      <Divider variant="fullWidth" />
    </Stack>
  );
};

export default SharedData;
