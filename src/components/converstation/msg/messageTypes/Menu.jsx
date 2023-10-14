import { useState } from "react";
import { Box, Menu as MUIMenu, MenuItem, Stack } from "@mui/material";
import { DotsThreeVertical } from "phosphor-react";

import { Message_options } from "../../../../data";

const Menu = ({ data }) => {
  const isIncoming = Boolean(data.incoming);
  const isOutgoing = Boolean(data.outgoing);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box
        position="absolute"
        sx={{
          ...(isOutgoing && {
            top: 0,
            right: -23,
          }),
          ...(isIncoming && {
            top: 0,
            left: -23,
          }),
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <DotsThreeVertical weight="bold" size={22} />
      </Box>
      <MUIMenu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isIncoming ? "left" : "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isOutgoing ? "right" : "left",
        }}
      >
        <Stack direction="column" spacing={1}>
          {Message_options.map((item, index) => (
            <MenuItem onClick={handleClose} key={index}>
              {item.title}
            </MenuItem>
          ))}
        </Stack>
      </MUIMenu>
    </Box>
  );
};
export default Menu;
