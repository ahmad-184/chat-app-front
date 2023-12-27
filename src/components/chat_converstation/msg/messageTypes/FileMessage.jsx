import { useState } from "react";
import { filesize } from "filesize";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { DownloadSimple } from "@phosphor-icons/react";

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
          backgroundColor:
            mode === "light"
              ? alpha(theme.palette.primary.lighter, 0.0)
              : "grey.900",
          borderRadius: 1,
          width: "100%",
          lineHeight: 0,
          p: 1,
          py: 1.5,
        }}
      >
        <Stack
          direction="row"
          // justifyContent="space-between"
          alignItems="center"
          spacing={1.5}
        >
          <Box
            sx={{
              color: "grey.400",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: mode === "light" ? "grey.700" : "grey.800",
                color: mode === "light" ? "grey.300" : "grey.400",
              }}
              onClick={handleDownloadFile}
              disabled={disableButton}
            >
              {!disableButton && <DownloadSimple size={25} />}
              {disableButton && <CircularProgress value={downloadProgress} />}
              {/* <CircularProgress value={"50"} fontColor={"grey.300"} /> */}
            </IconButton>
          </Box>
          <Stack direction="column" spacing={0}>
            <Typography
              variant="body2"
              color={mode === "light" ? "grey.300" : "grey.400"}
            >
              {data?.file?.public_id.split("/")[1]}
            </Typography>
            <Typography
              variant="body2"
              color={mode === "light" ? "grey.500" : "grey.400"}
            >
              {filesize(data?.file?.bytes, { standard: "jedec" })}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default FileMessage;
