import { Fragment } from "react";
import { IconButton, Stack, Box, Divider, useTheme } from "@mui/material";
import { VideoCamera, Phone, MagnifyingGlass, CaretDown } from "phosphor-react";

const icons = [
  {
    id: 0,
    icon: <VideoCamera />,
  },
  {
    id: 1,
    icon: <Phone />,
  },
  {
    id: 2,
    icon: <MagnifyingGlass />,
  },
  {
    id: 3,
    icon: <CaretDown />,
  },
];

const Buttons = () => {
  const mode = useTheme().palette.mode;

  return (
    <Stack
      direction="row"
      spacing={{
        xs: 0,
        md: 1,
        lg: 2,
      }}
      sx={{ flexGrow: 1, justifyContent: "end" }}
    >
      {icons.map((item) => (
        <Fragment key={item.id}>
          <Box>
            <IconButton
              sx={{ color: mode === "light" ? "grey.600" : "grey.200" }}
            >
              {item.icon}
            </IconButton>
          </Box>
          {item.id === 2 && (
            <Divider
              orientation="vertical"
              variant="fullWidth"
              sx={{ height: "auto" }}
            />
          )}
        </Fragment>
      ))}
    </Stack>
  );
};

export default Buttons;
