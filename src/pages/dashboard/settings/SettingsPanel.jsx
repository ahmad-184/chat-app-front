import { useMemo, useState } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Box,
  useTheme,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  alpha,
} from "@mui/material";
import {
  CaretLeft,
  Bell,
  Lock,
  Key,
  PencilCircle,
  Image,
  Note,
  Keyboard,
  Info,
} from "@phosphor-icons/react";
import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";

import { SimpleBarStyle } from "../../../components/Scrollbar";
import ShortcutsDialog from "../../../sections/dashboard/settings/ShortcutsDialog";
import ThemeDialog from "../../../sections/dashboard/settings/ThemeDialog";
import SidebarContainer from "../SidebarContainer";
import { Avatar } from "../../../components/image";
import createAvatar from "../../../utils/createAvatar";
import getPhotoUrl from "../../../utils/getPhotoUrl";

const SettingsPanel = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const user = useSelector((state) => state.auth.user);

  const imgData = getPhotoUrl(user?.avatar, "350", "30", "", "10");
  const avatar = createAvatar(user?.name);

  const [openShortcutsDiagram, setOpenShortcutsDiagram] = useState(false);
  const [openThemeDiagram, setOpenThemeDiagram] = useState(false);

  const handleCloseShortcutsDiagram = () => setOpenShortcutsDiagram(false);
  const handleCloseThemeDiagram = () => setOpenThemeDiagram(false);

  const list = useMemo(
    () => [
      {
        title: "Notifications",
        icon: <Bell size={22} />,
        key: 0,
        onClick: () => {},
      },
      {
        title: "Privacy",
        icon: <Lock size={22} />,
        key: 1,
        onClick: () => {},
      },
      {
        title: "Security",
        icon: <Key size={22} />,
        key: 2,
        onClick: () => {},
      },
      {
        title: "Theme",
        icon: <PencilCircle size={22} />,
        key: 3,
        onClick: () => {
          setOpenThemeDiagram(true);
        },
      },
      {
        title: "Chat Wallpaper",
        icon: <Image size={22} />,
        key: 4,
        onClick: () => {},
      },
      {
        title: "Request Account Info",
        icon: <Note size={22} />,
        key: 5,
        onClick: () => {},
      },
      {
        title: "Keyboard Shortcuts",
        icon: <Keyboard size={22} />,
        key: 6,
        onClick: () => {
          setOpenShortcutsDiagram(true);
        },
      },
      {
        title: "Help",
        icon: <Info size={22} />,
        key: 7,
        onClick: () => {},
      },
    ],
    []
  );

  return (
    <>
      <SidebarContainer>
        <SimpleBarStyle style={{ width: "100%", height: "100%" }}>
          <Stack direction="column" spacing={4} p={3} pb={2} width="100%">
            <Stack direction="row" spacing={3} width="100%" alignItems="center">
              <IconButton
                sx={{ color: mode === "light" && "grey.700" }}
                onClick={() => {
                  window.history.back();
                }}
              >
                <CaretLeft size={27} weight="regular" />
              </IconButton>
              <Typography variant="h4" fontSize={"26px !important"}>
                Settings
              </Typography>
            </Stack>
            <Stack spacing={2} alignItems="center">
              <Avatar
                src={imgData?.url}
                placeholder={imgData?.placeholder}
                width={115}
                height={115}
              >
                {avatar?.name}
              </Avatar>
              <Stack
                direction="column"
                spacing={2}
                minWidth={0}
                width="100%"
                px={2}
              >
                <Typography
                  variant="h4"
                  textAlign="center"
                  fontWeight={mode === "light" ? "700" : "600"}
                  sx={{
                    color: mode === "light" ? "grey.800" : "grey.200",
                  }}
                  noWrap
                  textTransform="capitalize"
                >
                  {user?.name}
                </Typography>
                <Stack spacing={1} width="100%">
                  <Typography
                    variant="body2"
                    fontWeight={mode === "light" ? "600" : "500"}
                    sx={{
                      color: mode === "light" ? "grey.600" : "grey.500",
                    }}
                    noWrap
                  >
                    About
                  </Typography>

                  <Typography
                    variant="body1"
                    fontWeight={mode === "light" ? "600" : "500"}
                    sx={{
                      color: mode === "light" ? "grey.700" : "grey.300",
                    }}
                  >
                    {user?.about}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Box
              sx={{
                "& .MuiListItem-root": {
                  pl: "0px",
                  pr: 0,
                  "& .MuiButtonBase-root": {
                    borderRadius: 0.6,
                    py: 1.7,
                  },
                },
              }}
            >
              <List>
                {list.map((item) => (
                  <ListItem
                    key={item.key}
                    sx={{
                      ...(item.key + 1 !== list.length && {
                        "&.MuiListItem-root": {
                          borderBottom: "1px solid",
                          borderColor:
                            mode === "light"
                              ? "grey.300"
                              : alpha(theme.palette.grey[700], 0.45),
                        },
                      }),
                    }}
                    onClick={item.onClick}
                  >
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </SimpleBarStyle>
      </SidebarContainer>
      {openShortcutsDiagram && (
        <ShortcutsDialog
          open={openShortcutsDiagram}
          handleClose={handleCloseShortcutsDiagram}
        />
      )}
      {openThemeDiagram && (
        <ThemeDialog
          open={openThemeDiagram}
          handleClose={handleCloseThemeDiagram}
        />
      )}
    </>
  );
};

export default SettingsPanel;
