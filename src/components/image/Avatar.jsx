import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Stack, Typography } from "@mui/material";

import noImage from "../../assets/Images/no-image.png";

const AvatarImage = forwardRef(
  (
    {
      disabledEffect = false,
      effect = "blur",
      src,
      placeholder,
      sx,
      width,
      height,
      onClick,
      children,
      alt,
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
        onClick={onClick}
        sx={{
          width: width || "40px",
          height: height || "40px",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          userSelect: "none",
          borderRadius: "50%",
          ...(error && {
            backgroundColor: "grey.600",
          }),
          "& .wrapper": {
            overflow: "hidden",
          },
          "& img": {
            textIndent: "1000000px",
            objectFit: "cover",
            textAlign: "center",
            color: "transparent",
          },
          ...sx,
        }}
      >
        {src && (
          <LazyLoadImage
            effect={disabledEffect ? undefined : effect}
            placeholderSrc={placeholder ? placeholder : undefined}
            wrapperClassName="wrapper"
            width={error ? 30 : width || 40}
            height={error ? 30 : height || 40}
            src={error ? noImage : src}
            alt={alt}
            {...other}
          />
        )}
        {!src && (
          <Stack
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "grey.400" : "grey.600",
              textAlign: "center",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light" ? "grey.600" : "grey.400",
              }}
            >
              {children}
            </Typography>
          </Stack>
        )}
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

export default AvatarImage;
