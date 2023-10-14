import { Fragment } from "react";
import {
  Box,
  Stack,
  useTheme,
  alpha,
  IconButton,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../../data";

import { SimpleBarStyle } from "../../../components/Scrollbar";
import User from "./User";

const Navbar = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
            <Stack>
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
            </Stack>
            <Stack direction="column" spacing={2}>
              {Nav_Buttons.map((item) => (
                <Fragment key={item.index}>
                  <Tooltip title={item.title} placement="right">
                    <Box
                      sx={{
                        p: 0.5,
                        borderRadius: 1.5,
                        backgroundColor: item.to === pathname && "primary.main",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(item.to)}
                    >
                      <IconButton
                        sx={{
                          color:
                            item.to === pathname
                              ? "white"
                              : mode === "light"
                              ? "black"
                              : "white",
                        }}
                      >
                        {item.icon}
                      </IconButton>
                    </Box>
                  </Tooltip>
                  {item.index === 2 && <Divider sx={{ pt: 1 }} />}
                </Fragment>
              ))}
            </Stack>
          </Stack>
          <User />
        </Stack>
      </SimpleBarStyle>
    </Box>
  );
};

export default Navbar;
