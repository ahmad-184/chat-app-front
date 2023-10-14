import { Stack } from "@mui/material";

const Container = ({ children, ...props }) => {
  return (
    <Stack direction="column" width="100%" height="100%" {...props}>
      {children}
    </Stack>
  );
};

export default Container;
