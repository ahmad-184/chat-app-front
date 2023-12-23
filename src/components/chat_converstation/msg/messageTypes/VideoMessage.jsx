import { useState } from "react";
import { Box, IconButton, Stack, alpha, useTheme } from "@mui/material";
import VideoThumbnail from "react-video-thumbnail";
import { Play } from "phosphor-react";

import { Image } from "../../../image";
import useResponsive from "../../../../hooks/useResponsive";

const VideoMessage = ({ data, openLightbox, changeLightboxIndex }) => {
  const theme = useTheme();
  const [thumb, setThumb] = useState("");

  const isLg = useResponsive("up", "lg");
  const isMd = useResponsive("up", "md");
  const isXs = useResponsive("up", "xs");

  return (
    <Stack py={1}>
      <Box
        sx={{
          lineHeight: 0,
          position: "relative",
          borderRadius: 1,
          cursor: "pointer",
          overflow: "hidden",
          "& .react-thumbnail-generator": {
            display: "none",
          },
        }}
        onClick={() => {
          changeLightboxIndex(data?.file?.url);
          openLightbox();
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          position="absolute"
          width="100%"
          height="100%"
          zIndex={1}
          sx={{
            inset: 0,
            backgroundColor: alpha(theme.palette.grey[900], 0.6),
          }}
        >
          <IconButton
            sx={{
              color: "grey.400",
              backgroundColor: alpha(theme.palette.grey[800], 0.4),
            }}
          >
            <Play size={80} weight="light" />
          </IconButton>
        </Stack>
        <Image
          src={thumb}
          placeholder={thumb}
          sx={{
            maxWidth: {},
            borderRadius: 1,
          }}
          width={isLg ? 400 : isMd ? 350 : isXs ? 300 : "100%"}
          height={isLg ? 370 : isMd ? 330 : isXs ? 270 : "100%"}
        />
        <VideoThumbnail
          videoUrl={data?.file?.url}
          thumbnailHandler={(thumbnail) => setThumb(thumbnail)}
        />
      </Box>
    </Stack>
  );
};

export default VideoMessage;
