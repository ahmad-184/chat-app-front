import { Box, Stack, useTheme, Skeleton } from "@mui/material";

const UserBoxSkeleton = () => {
  const mode = useTheme().palette.mode;

  return (
    <Box
      sx={{
        backgroundColor: mode === "light" ? "grey.200" : "grey.900",
        width: "100%",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ minWidth: "0px", maxWidth: "83%" }}
        >
          <Skeleton variant="circular" width="45px" height="45px" />
          <Stack direction="column" sx={{ minWidth: "0px" }}>
            <Skeleton variant="text" width="70px" height="20" />
            <Skeleton variant="text" width="110px" height="20" />
          </Stack>
        </Stack>
        <Stack direction="column" sx={{ minWidth: "0px", maxWidth: "25%" }}>
          <Skeleton variant="text" width="30px" height="20" />
          <Box display="flex" justifyContent="end" position="relative">
            <Skeleton variant="circular" width="20px" height="20" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserBoxSkeleton;
