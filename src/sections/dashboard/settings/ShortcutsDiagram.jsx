import { forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Typography,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const list = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Cmd", "Shift", "U"],
  },
  {
    key: 1,
    title: "Mute",
    combination: ["Cmd", "Shift", "M"],
  },
  {
    key: 2,
    title: "Archive Chat",
    combination: ["Cmd", "Shift", "E"],
  },
  {
    key: 3,
    title: "Delete Chat",
    combination: ["Cmd", "Shift", "D"],
  },
  {
    key: 4,
    title: "Pin Chat",
    combination: ["Cmd", "Shift", "P"],
  },
  {
    key: 5,
    title: "Search",
    combination: ["Cmd", "F"],
  },
  {
    key: 6,
    title: "Search Chat",
    combination: ["Cmd", "Shift", "F"],
  },
  {
    key: 7,
    title: "Next Chat",
    combination: ["Cmd", "N"],
  },
  {
    key: 8,
    title: "Next Step",
    combination: ["Ctrl", "Tab"],
  },
  {
    key: 9,
    title: "Previous Step",
    combination: ["Ctrl", "Shift", "Tab"],
  },
  {
    key: 10,
    title: "New Group",
    combination: ["Cmd", "Shift", "N"],
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["Cmd", "P"],
  },
  {
    key: 12,
    title: "Increase speed of voice message",
    combination: ["Shift", "."],
  },
  {
    key: 13,
    title: "Decrease speed of voice message",
    combination: ["Shift", ","],
  },
  {
    key: 14,
    title: "Settings",
    combination: ["Shift", "S"],
  },
  {
    key: 15,
    title: "Emoji Panel",
    combination: ["Cmd", "E"],
  },
  {
    key: 16,
    title: "Sticker Panel",
    combination: ["Cmd", "S"],
  },
];

const ShortcutsDiagram = ({ open, handleClose }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="md"
        scroll="body"
      >
        <DialogTitle sx={{ pb: 3 }}>Keyboard shortcuts</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {list.map((item) => (
              <Grid xs={12} sm={6} key={item.key}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: mode === "light" ? "grey.900" : "grey.200",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {item.combination.map((text) => (
                      <Box
                        sx={{
                          borderRadius: 1,
                          border: "2px solid",
                          borderColor:
                            mode === "light" ? "grey.300" : "grey.700",
                          display: "flex",
                          px: "9px",
                          py: "4px",
                          backgroundColor:
                            mode === "light"
                              ? "grey.200"
                              : alpha(theme.palette.grey[700], 0.6),
                          color: mode === "light" ? "grey.800" : "grey.200",
                        }}
                      >
                        <Typography variant="caption">{text}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShortcutsDiagram;
