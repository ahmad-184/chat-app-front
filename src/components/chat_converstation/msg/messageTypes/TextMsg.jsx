import { forwardRef } from "react";
import { useTheme, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const TextMsg = forwardRef(({ data }, ref) => {
  const theme = useTheme();
  const { userId } = useSelector((state) => state.auth);

  const mode = theme.palette.mode;
  const isOutgoing = Boolean(data?.sender === userId);

  return (
    <Typography
      variant="body2"
      sx={{
        ...(mode === "dark"
          ? {
              color: !isOutgoing ? "grey.200" : "grey.200",
            }
          : {
              color: !isOutgoing ? "grey.900" : "grey.200",
            }),
        fontWeight: "500",
        wordBreak: "break-word",
      }}
    >
      {data?.text}
    </Typography>
  );
});

export default TextMsg;
