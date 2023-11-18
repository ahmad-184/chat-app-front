import { Typography, Box } from "@mui/material";

import { fDateTimeHM } from "../../../../utils/formatTime";

const ShowMsgTime = ({ data }) => {
  const time = fDateTimeHM(data?.createdAt);

  return (
    <Box lineHeight={0}>
      <Typography
        variant="caption"
        sx={{
          color: "grey.500",
        }}
      >
        {time}
      </Typography>
    </Box>
  );
};

export default ShowMsgTime;
