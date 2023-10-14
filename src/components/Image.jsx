import { Box } from "@mui/material";

const Image = ({ src, alt, ...props }) => {
  console.log(src);
  return (
    <Box {...props}>
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  );
};

export default Image;
