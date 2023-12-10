import { Stack } from "@mui/material";
import Spinner from "../../../../components/Spinner";

const Loader = () => {
  return (
    <Stack width="100%" direction={"row"} justifyContent={"center"}>
      <Spinner />
    </Stack>
  );
};

export default Loader;
