import { Button, useTheme } from "@mui/material";
import proptypes from "prop-types";

import Spinner from "./Spinner";

const LoaderButton = ({ loading, children, ...props }) => {
  const theme = useTheme();

  return <Button {...props}>{loading ? <Spinner /> : children}</Button>;
};

LoaderButton.propTypes = {
  children: proptypes.node,
};

export default LoaderButton;
