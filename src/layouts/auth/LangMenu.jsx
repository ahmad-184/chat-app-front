import { useState } from "react";
import {
  Menu,
  IconButton,
  Box,
  MenuItem,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import { Translate, SunDim, Moon } from "phosphor-react";

import useLocales from "../../hooks/useLocales";
import useSettings from "../../hooks/useSettings";

const iconButtonStyle = (theme) => ({
  ...(theme.palette.mode === "light" && {
    "&:hover": {
      color: "grey.900",
    },
  }),
  ...(theme.palette.mode === "dark" && {
    "&:hover": {
      color: "grey.200",
    },
  }),
});

const LangMenu = () => {
  const { allLangs, currentLang, onChangeLang } = useLocales();
  const { onToggleMode, themeMode } = useSettings();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 20,
        right: 30,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Tooltip title="Change Language" placement="bottom">
        <IconButton onClick={handleClick} sx={iconButtonStyle}>
          <Translate />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={themeMode === "light" ? "Light" : "Dark"}
        placement="bottom"
      >
        <IconButton sx={iconButtonStyle} onClick={onToggleMode}>
          {themeMode === "light" ? <SunDim /> : <Moon />}
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {allLangs.map((item, index) => (
          <MenuItem
            onClick={() => {
              handleClose();
              onChangeLang(item.value);
              // if(item.value === 'fa') {
              //   onChangeDirection()
              // }
            }}
            key={index}
            selected={currentLang.value === item.value}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box>
                <img
                  style={{ maxWidth: 25 }}
                  src={item.icon}
                  alt={item.label}
                  loading="lazy"
                />
              </Box>
              <Typography variant="body2">{item.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LangMenu;
