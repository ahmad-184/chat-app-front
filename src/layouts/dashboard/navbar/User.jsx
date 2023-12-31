import { useState } from "react";
import {
  Stack,
  styled,
  Switch,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useSettings from "../../../hooks/useSettings";
import { Profile_Menu } from "../../../data";
import { logOut } from "../../../app/slices/auth";
import { appLogout } from "../../../app/slices/app";
import { logOutChatConv } from "../../../app/slices/conversation";
import { Avatar } from "../../../components/image";
import getPhotoUrl from "../../../utils/getPhotoUrl";
import createAvatar from "../../../utils/createAvatar";

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 32,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 30,
    height: 30,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const User = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { onToggleMode } = useSettings();

  const mode = theme.palette.mode;

  const imgData = getPhotoUrl(user?.avatar, "300", "10", "", "10");
  const avatar = createAvatar(user?.name);

  const handleLeaveApp = async () => {
    await dispatch(appLogout());
    await dispatch(logOutChatConv());
    await dispatch(logOut());
    window.localStorage.removeItem("redux-root");
    window.location = "/auth.login";
    window.location.reload();
  };

  return (
    <Stack
      direction="column"
      spacing={3}
      alignItems="center"
      justifyContent="center"
      pb={3}
    >
      <ThemeSwitch
        onChange={onToggleMode}
        checked={mode === "dark" ? true : false}
      />
      <Avatar
        onClick={handleClick}
        src={imgData.url}
        placeholder={imgData.placeholder}
        alt="user avatar"
        sx={{ cursor: "pointer" }}
      >
        {avatar.name}
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack direction="column" spacing={1}>
          {Profile_Menu.map((item, index) => (
            <MenuItem
              onClick={() => {
                switch (index) {
                  case 0:
                    handleClose();
                    navigate("/profile");
                    break;
                  case 1:
                    handleClose();
                    navigate("/settings");
                    break;
                  case 2:
                    handleLeaveApp();
                    handleClose();
                  default:
                    handleClose();
                    break;
                }
              }}
              key={index}
              sx={{
                "& .MuiListItemIcon-root": {
                  mr: "0",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {item.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </Stack>
  );
};

export default User;
