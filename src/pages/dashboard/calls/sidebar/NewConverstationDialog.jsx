import { forwardRef, useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  Slide,
  Stack,
  IconButton,
  useTheme,
  DialogContent,
} from "@mui/material";
import { X } from "@phosphor-icons/react";
import * as _ from "lodash";

import SearchInput from "../../../../components/SearchInput";
import { CallElement } from "./elements";

import { calls_data } from "../../../../data";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewConverstationDialog = ({ open, handleClose }) => {
  const [filteredData, setFilteredData] = useState([...calls_data]);

  const theme = useTheme();
  const mode = theme.palette.mode;

  const handleSearch = _.debounce((event) => {
    const query = event.target.value;
    if (query === "" || query === null) return setFilteredData([...calls_data]);
    setFilteredData(() => {
      return calls_data.filter(({ name }) =>
        name.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, 600);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="sm"
      scroll="body"
    >
      <DialogTitle sx={{ pb: 1, px: 4, pt: 2 }}>
        <Stack
          direction="row"
          spacing={6}
          alignItems="start"
          justifyContent="space-between"
        >
          <SearchInput width="100%" onChange={handleSearch} />
          <IconButton
            onClick={handleClose}
            sx={{
              color: mode === "dark" ? "grey.300" : "grey.800",
              backgroundColor: mode === "dark" ? "grey.700" : "grey.200",
            }}
          >
            <X size={21} weight="regular" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          mt: 3,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            "& .MuiBox-root": {
              backgroundColor: mode === "light" && "grey.200",
            },
          }}
        >
          {filteredData.map((data, index) => (
            <CallElement data={data} key={index} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NewConverstationDialog;
