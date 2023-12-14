import { useState, memo } from "react";
import {
  Box,
  Stack,
  Typography,
  alpha,
  useTheme,
  IconButton,
} from "@mui/material";
import { File as FileIcon, X } from "phosphor-react";
import VideoThumbnail from "react-video-thumbnail";

import { SimpleBarStyle } from "../../Scrollbar";
import Lightbox, { filterFiles } from "../../LightBox";

const File = ({ item, removeFile, selectIndex, openLightbox }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const splitedName = item.file.name.split(".");

  return (
    <Stack
      width={"120px !important"}
      spacing={1}
      direction={"column"}
      position="relative"
      sx={{
        "&:hover": {
          "& .file_box": {
            visibility: "visible",
            opacity: "1",
          },
        },
      }}
    >
      <Box
        className="file_box"
        position={"absolute"}
        top={15}
        right={5}
        sx={{
          cursor: "pointer",
          opacity: {
            md: "0",
          },
          visibility: {
            md: "0",
          },
          transition: "all .5s ease",
          color: "error.main",
        }}
        onClick={() => removeFile(item.file.name)}
      >
        <X size={19} weight={"bold"} />
      </Box>
      {item.type === "image" && (
        <Box
          sx={{
            width: "120px",
            flexGrow: 1,
            height: "90px",
            display: "flex",
            cursor: "pointer",
            "& img": {
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: 1,
            },
          }}
          onClick={() => {
            openLightbox();
            selectIndex();
          }}
        >
          <img src={item.fileData} alt={item.file.name} />
        </Box>
      )}
      {item.type === "video" && (
        <Box
          sx={{
            width: "120px",
            flexGrow: 1,
            height: "90px",
            display: "flex",
            cursor: "pointer",
            "& img": {
              width: "120px",
              height: "90px",
              borderRadius: 1,
            },
          }}
          onClick={() => {
            openLightbox();
            selectIndex();
          }}
        >
          <VideoThumbnail videoUrl={item.fileData} />
        </Box>
      )}
      {item.type !== "image" && item.type !== "video" && (
        <Stack
          flexGrow={1}
          sx={{
            width: "120px",
            color: "grey.500",
            height: "90px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: mode === "light" ? "grey.300" : "grey.700",
            borderRadius: 1,
            flexDirection: "column",
          }}
        >
          <FileIcon size={40} />
          <Typography
            variant="body2"
            noWrap
            textAlign="center"
            sx={{ color: mode === "light" ? "grey.600" : "grey.400" }}
          >
            .{splitedName.at(-1)}
          </Typography>
        </Stack>
      )}
      <Stack minWidth={0}>
        <Typography variant="caption" textAlign={"center"} noWrap>
          {item.file.name}
        </Typography>
      </Stack>
    </Stack>
  );
};

const FilesThumbnailes = ({ files, removeFile }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <Box
      px={2}
      pt={1}
      display={files.length ? "block" : "none"}
      sx={{
        "& .simplebar-content": {
          display: "flex",
          gap: 1.5,
        },
        "& .simplebar-scrollbar::before": {
          height: "5px",
        },
        backgroundColor:
          mode === "light" ? "grey.200" : alpha(theme.palette.grey[800], 0.8),
        borderTop: "1px solid",
        borderColor: mode === "light" ? "grey.300" : "grey.700",
      }}
    >
      <SimpleBarStyle
        style={{
          width: "100%",
          height: files.length && "140px",
        }}
      >
        {lightboxOpen ? (
          <Lightbox
            open={lightboxOpen}
            close={closeLightbox}
            index={index}
            slides={filterFiles(files)}
          />
        ) : null}
        {files.map((item, index) => (
          <File
            key={index}
            item={item}
            selectIndex={() => setIndex(index)}
            removeFile={removeFile}
            openLightbox={openLightbox}
          />
        ))}
      </SimpleBarStyle>
    </Box>
  );
};

export default FilesThumbnailes;
