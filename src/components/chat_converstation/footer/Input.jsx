import { useState, memo, forwardRef, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Menu,
  useTheme,
} from "@mui/material";
import { Smiley } from "@phosphor-icons/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Input = forwardRef(
  (
    {
      textInput,
      handleChangeTextInput,
      handleAddEmoji,
      startTyping,
      stopTyping,
      handleSendMessage,
    },
    ref
  ) => {
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

    const handlChange = (event) => {
      const value = event.target.value;
      handleChangeTextInput(value);
      startTyping();
      stopTyping();
    };

    useEffect(() => {
      ref.current?.focus();
    }, [ref?.current]);

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
          onChange={handlChange}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handleSendMessage();
            }
          }}
          InputProps={{
            inputRef: ref,
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  sx={{
                    color:
                      mode === "light" ? "primary.light" : "primary.lighter",
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
  }
);

export default memo(Input);
