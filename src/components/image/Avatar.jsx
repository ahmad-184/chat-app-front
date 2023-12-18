import { forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Stack, Typography } from "@mui/material";

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
      ...other
    },
    ref
  ) => {
    return (
      <Stack
        ref={ref}
        onClick={onClick}
        sx={{
          width: width || "40px",
          height: height || "40px",
          position: "relative",
          alingItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          userSelect: "none",
          borderRadius: "50%",
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
            width={width || 40}
            height={height || 40}
            src={src}
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
