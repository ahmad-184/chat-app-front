import { Button } from "@mui/material";
import proptypes from "prop-types";

import Spinner from "./Spinner";
import Progress from "./CircularProgressWithLabel";

const LoaderButton = ({ loading, value, children, ...props }) => {
  const hasProgress = Boolean(loading && value > 0);

  return (
    <Button {...props}>
      {hasProgress ? (
        <Progress value={value} />
      ) : loading ? (
        <Spinner />
      ) : (
        children
      )}
    </Button>
  );
};

LoaderButton.propTypes = {
  children: proptypes.node,
};

export default LoaderButton;
