import { Box, Stack } from "@mui/material";
import { trackWindowScroll } from "react-lazy-load-image-component";

import { Image } from "../../../image";
import useResponsive from "../../../../hooks/useResponsive";

const ImageMessage = ({ data, openLightbox, changeLightboxIndex }) => {
  const imgUrl = data.file.url.replace("upload", "upload/q_40,dpr_1.0");
  const placeholder = data.file.url.replace(
    "upload",
    "upload/q_10,dpr_1.0,w_50"
  );

  const isLg = useResponsive("up", "lg");
  const isMd = useResponsive("up", "md");
  const isXs = useResponsive("up", "xs");

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
          changeLightboxIndex(imgUrl);
          openLightbox();
        }}
      >
        <Image
          src={imgUrl}
          placeholder={placeholder}
          sx={{
            borderRadius: 1,
          }}
          maxHeight={"50vh"}
          width={isLg ? 400 : isMd ? 350 : isXs ? 300 : "100%"}
          height={isLg ? 370 : isMd ? 330 : isXs ? 270 : "100%"}
        />
      </Box>
    </Stack>
  );
};

export default trackWindowScroll(ImageMessage);
