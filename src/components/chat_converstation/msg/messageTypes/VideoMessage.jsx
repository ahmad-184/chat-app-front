import { useState } from "react";
import { Box, IconButton, Stack, alpha, useTheme } from "@mui/material";
import VideoThumbnail from "react-video-thumbnail";
import { Play } from "phosphor-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import imagePlaceholder from "../../../../assets/Images/placeholder.png";

const VideoMessage = ({ data, openLightbox, changeLightboxIndex }) => {
  const theme = useTheme();
  const [thumb, setThumb] = useState("");

  return (
    <Stack py={1}>
      <Box
        sx={{
          width: 350,
          height: 240,
          lineHeight: 0,
          position: "relative",
          borderRadius: 1,
          cursor: "pointer",
          overflow: "hidden",
          "& .react-thumbnail-generator": {
            display: "none",
          },
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
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
            backgroundColor: alpha(theme.palette.grey[900], 0.5),
          }}
        >
          <IconButton sx={{ color: "grey.400" }}>
            <Play size={80} weight="light" />
          </IconButton>
        </Stack>
        <LazyLoadImage
          alt={data?.original_name}
          src={thumb}
          placeholderSrc={imagePlaceholder}
          effect="blur"
          width={350}
          height={240}
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
