import { useTheme } from "@mui/material";
import LoaderSvg from "../assets/Illustration/LoaderSvg";

const Spinner = ({ color }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <LoaderSvg
      color={
        color || mode === "light"
          ? theme.palette.grey[400]
          : theme.palette.grey[600]
      }
    />
  );
};

export default Spinner;
