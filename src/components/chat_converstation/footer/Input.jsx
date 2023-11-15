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

const Input = ({ textInput, handleChangeTextInput, handleAddEmoji }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

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
            borderRadius: 2,
          },
        }}
        value={textInput}
        onChange={(event) => {
          handleChangeTextInput(event.target.value);
        }}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                sx={{
                  color: mode === "light" ? "primary.light" : "primary.lighter",
                }}
                onClick={handleClickOpenPicker}
              >
                <Smiley size={25} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="Enter message..."
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
          onEmojiSelect={(data) => {
            handleAddEmoji(data.native);
          }}
          theme={theme.palette.mode}
        />
      </Menu>
    </Box>
  );
};

export default Input;
