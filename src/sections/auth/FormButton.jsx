import { Button, useTheme } from "@mui/material";

const FormButton = ({ children, ...props }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Button
      type="submit"
      {...props}
      sx={{
        boxShadow: "none",
        bgcolor: "grey.800",
        "&:hover": {
          bgcolor: "grey.700",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default FormButton;
