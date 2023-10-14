import { Box, Typography } from "@mui/material";

const ShowMsgTime = ({ data }) => {
  const isIncoming = Boolean(data.incoming);
  const isOutgoing = Boolean(data.outgoing);

  const hour = "0" + (Math.floor(Math.random() * 24) % 24);
  const minute = "0" + (Math.floor(Math.random() * 59) % 59);

  const time = `${hour.length >= 3 ? hour.slice(1) : hour.slice(0)}:${
    minute.length >= 3 ? minute.slice(1) : minute.slice(0)
  }`;

  return (
    <Box
      position="absolute"
      sx={{
        ...(isOutgoing && {
          bottom: -11,
          left: -35,
        }),
        ...(isIncoming && {
          bottom: -11,
          right: -35,
        }),
      }}
    >
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
