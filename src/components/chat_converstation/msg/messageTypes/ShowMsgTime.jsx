import { Typography, Box } from "@mui/material";

import { fDateTimeHM } from "../../../../utils/formatTime";

const ShowMsgTime = ({ data }) => {
  return (
    <Box lineHeight={0}>
      <Typography
        variant="caption"
        sx={{
          color: "grey.500",
        }}
      >
        {fDateTimeHM(data?.createdAt)}
      </Typography>
    </Box>
  );
};

export default ShowMsgTime;
