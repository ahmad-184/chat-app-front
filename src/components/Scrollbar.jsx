import PropTypes from "prop-types";
import SimpleBarReact from "simplebar-react";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(
  ({ theme: { palette } }) => `
  flexGrow: 1;
  height: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${
      palette.mode === "light" ? palette.grey[500_24] : palette.grey[500_16]
    };
    border-radius: 0.1rem;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${
      palette.mode === "light" ? palette.grey[500_32] : palette.grey[500_24]
    };
    border-radius: 0.1rem;
  }
`
);

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  // maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 11,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
  "& .simplebar-placeholder": {
    height: "0 !important",
  },
}));

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}

export { SimpleBarStyle };
