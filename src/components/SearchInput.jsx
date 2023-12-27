import { Box, useTheme, InputBase } from "@mui/material";
import { MagnifyingGlass } from "@phosphor-icons/react";

const SearchInput = ({ ...props }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      sx={{
        backgroundColor: mode === "light" ? "grey.300" : "grey.900",
        borderRadius: 2,
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
          lineHeight: "16px",
          color: mode === "light" ? "grey.600" : "grey.500",
        }}
      >
        <MagnifyingGlass size={24} weight="regular" />
      </Box>
      <InputBase
        placeholder="Search..."
        {...props}
        sx={{
          width: "100%",
          color: mode === "light" ? "grey.700" : theme.palette.grey[400],
          fontWeight: "500",
          "& .MuiInputBase-input::placeholder": {
            color: mode === "light" ? "grey.600" : theme.palette.grey[600],
          },
        }}
      />
    </Box>
  );
};

export default SearchInput;
