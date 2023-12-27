import { Fragment } from "react";
import { IconButton, Stack, Box, Divider, useTheme } from "@mui/material";
import {
  VideoCamera,
  Phone,
  MagnifyingGlass,
  CaretDown,
} from "@phosphor-icons/react";

const icons = [
  {
    id: 0,
    icon: <MagnifyingGlass fontSize={23} weight="regular" />,
  },
  {
    id: 1,
    icon: <VideoCamera fontSize={23} weight="regular" />,
  },
  {
    id: 2,
    icon: <Phone fontSize={23} weight="regular" />,
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
              sx={{ color: mode === "light" ? "grey.700" : "grey.300" }}
            >
              {item.icon}
            </IconButton>
          </Box>
        </Fragment>
      ))}
    </Stack>
  );
};

export default Buttons;
