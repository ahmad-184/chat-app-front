import { Box, Stack } from "@mui/material";
import { trackWindowScroll } from "react-lazy-load-image-component";

import { Image } from "../../../image";
import useResponsive from "../../../../hooks/useResponsive";
import getPhotoUrl from "../../../../utils/getPhotoUrl";

const ImageMessage = ({ data, openLightbox, changeLightboxIndex }) => {
  const image = getPhotoUrl(data.file.url, null, "40", "50", "10");

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
          changeLightboxIndex(image.url);
          openLightbox();
        }}
      >
        <Image
          src={image.url}
          placeholder={image.placeholder}
          sx={{
            borderRadius: 1,
          }}
          width={isLg ? 400 : isMd ? 350 : isXs ? 300 : "100%"}
          height={isLg ? 370 : isMd ? 330 : isXs ? 270 : "100%"}
        />
      </Box>
    </Stack>
  );
};

export default trackWindowScroll(ImageMessage);
