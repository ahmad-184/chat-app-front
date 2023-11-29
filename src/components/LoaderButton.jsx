import { Button, useTheme } from "@mui/material";
import proptypes from "prop-types";

const LoadingSvg = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="1.5s"
            calcMode="spline"
            values="0 150;42 150;42 150;42 150"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="1.5s"
            calcMode="spline"
            values="0;-16;-59;-59"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="2s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
};

const LoaderButton = ({ loading, children, ...props }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Button {...props}>
      {loading ? (
        <LoadingSvg
          color={
            mode === "light" ? theme.palette.grey[400] : theme.palette.grey[600]
          }
        />
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
