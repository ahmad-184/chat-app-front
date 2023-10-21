import proptypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import { WarningOctagon } from "phosphor-react";

export default function ErrorText({ message }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <WarningOctagon size={19} />
      <Typography variant="caption">{message}</Typography>
    </Stack>
  );
}

ErrorText.propTypes = {
  message: proptypes.string,
};
