import { Stack, Divider, useTheme, Typography } from "@mui/material";
import { format, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";

import { fTimestamp } from "../../../../utils/formatTime";

const time = (data) => {
  const HM = data ? format(fTimestamp(data), "p") : "";
  const day = data ? format(fTimestamp(data), "dd") : "";
  const weekDay = data ? format(fTimestamp(data), "EE") : "";
  const month = data ? format(fTimestamp(data), "MMM") : "";
  const year = data ? format(fTimestamp(data), "yyyy") : "";

  const isDateForToday = data ? isToday(fTimestamp(data)) : "";
  const isDateForYesterday = data ? isYesterday(fTimestamp(data)) : "";
  const isDateForThisWeek = data ? isThisWeek(fTimestamp(data)) : "";
  const isDateForThisYear = data ? isThisYear(fTimestamp(data)) : "";
  return (
    <>
      {`${isDateForToday ? "Today" : isDateForYesterday ? "Yesterday" : ""} `}
      {`${
        !isDateForToday && !isDateForYesterday && isDateForThisWeek
          ? weekDay
          : ""
      } `}
      {`${
        !isDateForToday &&
        !isDateForYesterday &&
        !isDateForThisWeek &&
        isDateForThisYear
          ? `${day} ${month}`
          : ""
      } `}
      {`${
        !isDateForToday && !isDateForThisWeek && !isDateForThisYear
          ? `${day} ${month} ${year}`
          : ""
      } `}
    </>
  );
};

const Timeline = ({ data }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Stack direction="row" width="100%" py={1.5}>
      <Divider
        variant="fullWidth"
        textAlign="center"
        sx={{
          borderWidth: "1px",
          backgroundColor: "none",
          width: "100%",
          typography: "caption",
          color: mode === "light" ? "grey.500" : "grey.400",
          "&::after,::before": {
            borderTop: "1px dashed",
            borderColor: mode === "light" ? "grey.400" : "grey.700",
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            borderRadius: 2,
            color: mode === "light" ? "grey.500" : "grey.600",
            fontSize: "13px",
            backgroundColor: mode === "light" ? "grey.300" : "grey.800",
            fontWeight: "600",
            px: 1.4,
            py: 0.7,
          }}
        >
          {data && time(data)}
        </Typography>
      </Divider>
    </Stack>
  );
};

export default Timeline;
