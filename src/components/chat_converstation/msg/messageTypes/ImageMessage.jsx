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
    <Stack>
      <Box
        py={1}
        sx={{
          "& img": {
            width: "100%",
            height: "100%",
            borderRadius: 1,
            objectFit: "cover",
          },
        }}
        onClick={() => {
          changeLightboxIndex(data.file.url);
          openLightbox();
        }}
      >
        <LazyLoadImage
          alt={data.original_name}
          // src={data.file.secure_url}
          src={image}
          placeholderSrc={placeholder}
          effect="blur"
          width={350}
          height={240}
          // useIntersectionObserver={false}
        />
      </Box>
    </Stack>
  );
};

export default trackWindowScroll(ImageMessage);
