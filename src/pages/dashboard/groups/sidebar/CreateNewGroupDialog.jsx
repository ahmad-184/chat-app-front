import { forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  useTheme,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Autocomplete,
  TextField,
  FormProvider,
} from "../../../../components/hook-form";
import { createNewGroupValidator } from "../../../../validations";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateNewGroupDialog = ({ open, handleClose }) => {
  const defaultValues = {
    group_name: "",
    members: [],
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(createNewGroupValidator),
  });

  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    setError,
    reset,
    watch,
  } = methods;

  console.log(watch("members"));

  const onSubmit = async (data) => {
    try {
      console.log(data);
      reset();
    } catch (err) {
      console.log(data);
      setError("afterSubmit", {
        ...err,
        message: err.message,
      });
    }
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
        <DialogTitle sx={{ pb: 1, px: 5, pt: 4 }}>Create New Group</DialogTitle>
        <DialogContent sx={{ px: 5, pt: "1rem !important" }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {errors.afterSubmit ? (
                <Alert severity="error" variant="outlined">
                  {errors.afterSubmit.message}
                </Alert>
              ) : null}
              <TextField label="Group Name" type="text" name="group_name" />
              <Autocomplete
                name="members"
                helperText={"At least 2 members required"}
                options={names}
                limitTags={2}
                disableCloseOnSelect={true}
                getOptionLabel={(option) => option}
                label="Members"
                multiple={true}
              />
              <Stack direction="row" justifyContent="end" pt={2} spacing={2}>
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="text"
                  color="info"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Create
                </Button>
              </Stack>
            </Stack>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewGroupDialog;
