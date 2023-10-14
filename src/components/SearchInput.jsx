import { Stack, Box, useTheme, InputBase, alpha } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";

const SearchInput = ({ ...props }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      sx={{
        backgroundColor:
          mode === "light" ? "#EAF2FE" : alpha(theme.palette.grey[700], 0.3),
        borderRadius: 2.3,
        display: "flex",
        flexDirection: "row",
        py: 1,
        px: 2,
        alignItems: "center",
        gap: 1.5,
        width: "100%",
      }}
    >
      <Box
        sx={{
          lineHeight: "15px",
          color: mode === "light" ? "#709CE6" : theme.palette.grey[500],
        }}
      >
        <MagnifyingGlass size={24} weight="regular" />
      </Box>
      <InputBase
        placeholder="Search..."
        {...props}
        sx={{
          width: "100%",
          color: mode === "light" ? "#709CE6" : theme.palette.grey[400],
          fontWeight: "500",
          "& .MuiInputBase-input::placeholder": {
            color: mode === "light" ? "#709CE6" : theme.palette.grey[600],
          },
        }}
      />
    </Box>
  );
};

export default SearchInput;
