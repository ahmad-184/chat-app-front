import { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDiagram = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ pb: 0.5 }}>Block Contact</DialogTitle>
        <DialogContent sx={{ pb: 0.5 }}>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to block this Contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BlockDiagram;
