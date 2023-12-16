import { Box, Stack } from "@mui/material";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";

const ImageMessage = ({ data, openLightbox, changeLightboxIndex }) => {
  const image = data.file.url.replace("upload", "upload/q_40,dpr_1.0");
  const placeholder = data.file.url.replace(
    "upload",
    "upload/q_10,dpr_1.0,w_50"
  );

  return (
    <Stack py={1}>
      <Box
        sx={{
          cursor: "pointer",
          lineHeight: 0,
          "& img": {
            width: "100%",
            height: "100%",
            borderRadius: 1,
            objectFit: "cover",
          },
        }}
        onClick={() => {
          changeLightboxIndex(image);
          openLightbox();
        }}
      >
        <LazyLoadImage
          alt={data.original_name}
          src={image}
          placeholderSrc={placeholder}
          effect="blur"
          width={350}
          height={240}
        />
      </Box>
    </Stack>
  );
};

export default trackWindowScroll(ImageMessage);
