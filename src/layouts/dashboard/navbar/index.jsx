import { Fragment, useEffect } from "react";
import {
  Box,
  Stack,
  useTheme,
  alpha,
  IconButton,
  Avatar,
  Tooltip,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  WifiHigh,
  WifiSlash,
  WifiMedium,
  WifiLow,
  WifiNone,
} from "phosphor-react";

import logo from "../../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../../data";

import { SimpleBarStyle } from "../../../components/Scrollbar";
import User from "./User";
import useSocket from "../../../hooks/useSocket";

const Navbar = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { connection, ping } = useSocket();

  return (
    <Box
      width={{
        xs: "80px",
        sm: "100px",
      }}
      pt={3}
      height="100vh"
      backgroundColor={mode === "light" ? "grey.100" : "grey.900"}
      boxShadow={`0px 0px 0px 2px ${alpha("#000", 0.05)}`}
      sx={{
        "& .simplebar-content": {
          height: "100%",
        },
      }}
    >
      <SimpleBarStyle
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          width="100%"
          height="100%"
          spacing={7}
        >
          <Stack direction="column" alignItems="center" spacing={3}>
            <Stack alignItems={"center"} spacing={1}>
              <Box>
                <Avatar
                  sx={{
                    width: "80px",
                    height: "80px",
                  }}
                  src={logo}
                  alt="chat app logo picture"
                />
              </Box>
              <Stack
                sx={{
                  ...(connection && {
                    color: mode === "light" ? "success.main" : "success.light",
                  }),
                  ...(!connection && {
                    color: mode === "light" ? "error.main" : "error.light",
                  }),
                }}
              >
                {connection ? <WifiHigh size={25} /> : <WifiSlash size={25} />}
              </Stack>
              <Typography variant="caption" color="grey.500">
                Ping: {connection && ping ? `${ping}ms` : "...."}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={2} alignItems="center">
            {Nav_Buttons.map((item) => (
              <Fragment key={item.index}>
                <Tooltip title={item.title} placement="right">
                  <Box
                    sx={{
                      p: 0.5,
                      borderRadius: 1.5,
                      backgroundColor:
                        item.to === pathname &&
                        alpha(theme.palette.primary.main, 0.2),
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(item.to)}
                  >
                    <IconButton
                      sx={{
                        ...(item.to === pathname
                          ? {
                              color:
                                mode === "light"
                                  ? "primary.dark"
                                  : "primary.lighter",
                            }
                          : {
                              color: mode === "light" ? "grey.600" : "grey.500",
                            }),
                      }}
                      disableRipple
                    >
                      {item.icon}
                    </IconButton>
                  </Box>
                </Tooltip>
              </Fragment>
            ))}
          </Stack>
          <User />
        </Stack>
      </SimpleBarStyle>
    </Box>
  );
};

export default Navbar;
