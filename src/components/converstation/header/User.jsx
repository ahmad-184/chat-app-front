import { Typography, Stack, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";

import { toggleSidebar } from "../../../app/slices/app";

const User = () => {
  const dispatch = useDispatch();

  const handleToggleSidebar = () => dispatch(toggleSidebar());

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        minWidth: "0px",
      }}
    >
      <Avatar
        onClick={handleToggleSidebar}
        src={faker.image.avatar()}
        alt="user profile picture"
        sx={{
          cursor: "pointer",
        }}
      />
      <Stack
        direction="column"
        sx={{
          minWidth: "0px",
        }}
      >
        <Typography variant="subtitle1" noWrap>
          {faker.name.fullName()}
        </Typography>
        <Typography variant="caption" sx={{ color: "success.main" }}>
          Online
        </Typography>
      </Stack>
    </Stack>
  );
};

export default User;
