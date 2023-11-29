import proptypes from "prop-types";

import LoaderButton from "../../components/LoaderButton";

const FormButton = ({ loading, disabled, children, ...props }) => {
  return (
    <LoaderButton
      type="submit"
      {...props}
      disabled={disabled ? true : loading ? true : false}
      sx={{
        boxShadow: "none",
        bgcolor: "grey.800",
        "&:hover": {
          bgcolor: "grey.700",
        },
      }}
      disableRipple={false}
      loading={loading}
    >
      {children}
    </LoaderButton>
  );
};

FormButton.propTypes = {
  children: proptypes.node,
};

export default FormButton;
