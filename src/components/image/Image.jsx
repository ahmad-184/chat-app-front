import { forwardRef } from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box } from "@mui/material";

const Image = forwardRef(
  (
    {
      disabledEffect = false,
      effect = "blur",
      placeholder,
      sx,
      width,
      height,
      ...other
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        component="span"
        sx={{
          lineHeight: 1,
          display: "block",
          overflow: "hidden",
          position: "relative",
          "& .wrapper": {
            width: "100%",
            height: "100%",
            backgroundSize: "cover !important",
            "& img": {
              objectFit: "cover",
            },
          },
          ...sx,
        }}
      >
        <LazyLoadImage
          wrapperClassName="wrapper"
          effect={disabledEffect ? undefined : effect}
          placeholderSrc={placeholder ? placeholder : undefined}
          width={width || "100%"}
          height={height || "100%"}
          {...other}
        />
      </Box>
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
