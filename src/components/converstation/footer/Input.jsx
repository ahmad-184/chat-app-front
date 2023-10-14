import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Menu,
  useTheme,
  Fab,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  LinkSimple,
  Smiley,
  Image,
  Sticker,
  Camera,
  File,
  User,
} from "phosphor-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Actions = [
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
];

const Input = () => {
  const theme = useTheme();

  const [anchorElActions, setAnchorElActions] = useState(null);
  const openActions = Boolean(anchorElActions);
  const handleClickOpenActions = (event) => {
    setAnchorElActions(event.currentTarget);
  };
  const handleCloseActions = () => {
    setAnchorElActions(null);
  };

  const [anchorElPicker, setAnchorElPicker] = useState(null);
  const openPicker = Boolean(anchorElPicker);
  const handleClickOpenPicker = (event) => {
    setAnchorElPicker(event.currentTarget);
  };
  const handleClosePicker = () => {
    setAnchorElPicker(null);
  };

  return (
    <Box width="100%" position="relative">
      <Menu
        id="basic-menu-1"
        anchorEl={anchorElActions}
        open={openActions}
        onClose={handleCloseActions}
        MenuListProps={{
          "aria-labelledby": "basic-button-1",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent !important",
            boxShadow: "none !important",
            transform: openActions && "translateY(-55px) !important",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{
            position: "relative",
          }}
        >
          {Actions.map((item, index) => (
            <Tooltip title={item.title} placement="right" key={index}>
              <Fab
                sx={{
                  backgroundColor: item.color,
                  p: 1,
                }}
                onClick={handleCloseActions}
              >
                {item.icon}
              </Fab>
            </Tooltip>
          ))}
        </Stack>
      </Menu>

      <TextField
        sx={{
          width: "100%",
          "&.MuiTextField-root": {
            "& .MuiInputBase-root": {
              pl: 1,
              pr: 0.2,
            },
          },
          "& .MuiInputBase-input": {
            py: 1.5,
          },
          "& .MuiInputAdornment-root": {
            mt: "0px !important",
          },
          "& .MuiInputBase-root": {
            borderRadius: 1.2,
          },
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleClickOpenActions}>
                <LinkSimple size={27} />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleClickOpenPicker}>
                <Smiley size={27} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="Write a message..."
        variant="filled"
      />
      <Menu
        id="basic-menu-2"
        anchorEl={anchorElPicker}
        open={openPicker}
        onClose={handleClosePicker}
        MenuListProps={{
          "aria-labelledby": "basic-button-2",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent !important",
            boxShadow: "none !important",
          },
        }}
      >
        <Picker
          data={data}
          onEmojiSelect={console.log}
          theme={theme.palette.mode}
        />
      </Menu>
    </Box>
  );
};

export default Input;
