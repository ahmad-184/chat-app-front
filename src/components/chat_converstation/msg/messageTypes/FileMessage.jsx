import { useState, useRef } from "react";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { File, DownloadSimple } from "phosphor-react";

import downloadFile from "../../../../utils/downloadFile";
import CircularProgress from "../../../CircularProgressWithLabel";

const FileMessage = ({ data }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  const handleDownloadFile = () => {
    downloadFile(
      data?.file?.url,
      data?.file?.original_filename,
      setDownloadProgress,
      setDisableButton
    );
  };

  return (
    <Stack py={0.5}>
      <Box
        sx={{
          backgroundColor: mode === "light" ? "grey.200" : "grey.900",
          borderRadius: 1,
          width: "100%",
          lineHeight: 0,
          p: 1,
          py: 1.5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2.5}
        >
          <Box
            sx={{
              color: "grey.400",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: mode === "light" ? "grey.300" : "grey.800",
                color: mode === "light" ? "grey.700" : "grey.400",
              }}
              onClick={handleDownloadFile}
              disabled={disableButton}
            >
              {!disableButton && <DownloadSimple size={30} />}
              {disableButton && <CircularProgress value={downloadProgress} />}
            </IconButton>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="body2"
              color={mode === "light" ? "grey.800" : "grey.400"}
            >
              {data?.file?.original_filename}
            </Typography>
            <Box
              fontSize={30}
              sx={{
                color: mode === "light" ? "grey.700" : "grey.400",
              }}
            >
              <File />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default FileMessage;
