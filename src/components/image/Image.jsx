import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Stack } from "@mui/material";

import noImage from "../../assets/Images/no-image.png";

const Image = forwardRef(
  (
    {
      disabledEffect = false,
      effect = "blur",
      placeholder,
      sx,
      width,
      height,
      alt,
      src,
      ...other
    },
    ref
  ) => {
    const [error, setError] = useState(false);

    useEffect(() => {
      const fetchUrl = async () => {
        if (src.startsWith("blob")) return setError(false);
        const http = new XMLHttpRequest();
        http.open("HEAD", src, false);
        http.send();
        if (http.status === 404) {
          if (error === true) return;
          else setError(true);
        } else if (http.status === 200) {
          if (error === false) return;
          else setError(false);
        }
      };
      fetchUrl();
    }, [src]);

    return (
      <Stack
        ref={ref}
        component="span"
        sx={{
          lineHeight: 1,
          overflow: "hidden",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          ...(error && {
            backgroundColor: "grey.600",
          }),
          "& .wrapper": {
            display: "flex !important",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundSize: "cover !important",
            "& img": {
              objectFit: "cover",
              ...(error && {
                width: "50px",
                height: "50px",
              }),
            },
          },
          ...sx,
        }}
      >
        <LazyLoadImage
          wrapperClassName="wrapper"
          effect={disabledEffect ? undefined : effect}
          placeholderSrc={error ? null : placeholder ? placeholder : undefined}
          width={width || "100%"}
          height={height || "100%"}
          alt={alt}
          src={error ? noImage : src}
          {...other}
        />
      </Stack>
    );
  }
);

Image.propTypes = {
  sx: PropTypes.object,
  effect: PropTypes.string,
  disabledEffect: PropTypes.bool,
  placeholderSrc: PropTypes.string,
};

export default Image;
