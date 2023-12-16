import { Box, Stack, useTheme } from "@mui/material";

const AudioMessage = ({ data }) => {
  const theme = useTheme();

  return (
    <Stack py={1}>
      <Box
        sx={{
          cursor: "pointer",
          maxWidth: 350,
          "& audio": {
            width: "100%",
          },
        }}
      >
        <audio autoPlay={false} controls>
          <source
            src={data.file.url}
            type={`audio/${data.file.url.split(".").at(-1)}`}
          />
        </audio>
      </Box>
    </Stack>
  );
};

export default AudioMessage;
