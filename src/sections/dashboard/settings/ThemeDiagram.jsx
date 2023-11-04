import { forwardRef, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import useSettings from "../../../hooks/useSettings";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ThemeDiagram = ({ open, handleClose }) => {
  const { onChangeMode, themeMode } = useSettings();
  const [selectedMode, setSelectedMode] = useState(themeMode);

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const handleChange = (e) => {
    setSelectedMode(e.target.value);
  };

  const handleClick = () => {
    if (selectedMode === "dark" || selectedMode === "light") {
      onChangeMode(null, selectedMode);
    } else {
      onChangeMode(null, systemTheme);
    }
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ pb: 3, px: 5, pt: 4 }}>Choose Theme</DialogTitle>
        <DialogContent sx={{ px: 5 }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{
              "& .MuiTypography-root": {
                pl: "10px",
              },
            }}
            value={selectedMode}
          >
            <FormControlLabel
              control={<Radio value="light" onChange={handleChange} />}
              label="Light"
            />
            <FormControlLabel
              control={<Radio value="dark" onChange={handleChange} />}
              label="Dark"
            />
            <FormControlLabel
              control={<Radio value="system" onChange={handleChange} />}
              label="System"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ThemeDiagram;
