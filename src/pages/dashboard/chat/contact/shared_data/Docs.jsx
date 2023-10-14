import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import {
  FileDoc,
  FileImage,
  FileVideo,
  MicrosoftWordLogo,
  FilePdf,
  MicrosoftExcelLogo,
  MicrosoftPowerpointLogo,
  DownloadSimple,
} from "phosphor-react";

import { SHARED_docs } from "../../../../../data";

const getFormatIcon = (name) => {
  let icon = "";

  switch (name) {
    case "image":
      icon = <FileImage size={37} weight="fill" />;
      break;
    case "video":
      icon = <FileVideo size={37} weight="fill" />;
      break;
    case "word":
      icon = <MicrosoftWordLogo size={37} weight="fill" />;
      break;
    case "pdf":
      icon = <FilePdf size={37} weight="fill" />;
      break;
    case "excel":
      icon = <MicrosoftExcelLogo size={37} weight="fill" />;
      break;
    case "powerpoint":
      icon = <MicrosoftPowerpointLogo size={37} weight="fill" />;
      break;
    default:
      icon = <FileDoc size={37} weight="fill" />;
      break;
  }
  return icon;
};

const Doc = ({ data }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const fileIcon = getFormatIcon(data.type);

  return (
    <Stack
      direction="column"
      spacing={1.3}
      sx={{
        backgroundColor: mode === "light" ? "grey.300" : "grey.800",
        borderRadius: 1.5,
        p: 1,
        px: 1.5,
        boxShadow: theme.shadows[3],
      }}
    >
      <Box
        width="100%"
        height="130px"
        sx={{
          backgroundColor: mode === "light" ? "grey.200" : "grey.700",
          borderRadius: 1,
        }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Stack direction="row" spacing={1} alignItems="center" minWidth={0}>
          <Box
            color={mode === "light" ? "grey.800" : "grey.200"}
            display="flex"
          >
            {fileIcon}
          </Box>
          <Typography
            variant="body2"
            fontWeight={mode === "light" ? "600" : "400"}
            color={mode === "light" ? "grey.700" : "grey.200"}
            noWrap
          >
            {data.name}
          </Typography>
        </Stack>
        <IconButton
          sx={{
            color: mode === "light" ? "grey.800" : "grey.300",
          }}
        >
          <DownloadSimple size={30} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

const Docs = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Stack direction="column" spacing={3}>
      <Box>
        <Typography
          variant="body2"
          fontWeight={mode === "light" ? 600 : 400}
          sx={{
            color: mode === "light" ? "grey.600" : "grey.300",
            fontSize: 13,
          }}
        >
          27th Oct 22
        </Typography>
        <Stack direction="column" spacing={1.5} mt={2}>
          {SHARED_docs.map((item, index) => (
            <Box width="100%" key={index}>
              <Doc data={item} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default Docs;
