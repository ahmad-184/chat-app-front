import { Box, Stack, Typography, useTheme } from "@mui/material";
import { faker } from "@faker-js/faker";

const Image = ({ num }) => {
  return (
    <>
      {[...Array(num)].map((_, index) => (
        <Box
          sx={{
            mt: 2,
            width: "30%",
            maxHeight: "90px",
            borderRadius: 0.5,
            overflow: "hidden",
          }}
          key={index}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={faker.image.avatar()}
            alt={faker.name.fullName()}
          />
        </Box>
      ))}
    </>
  );
};

const Medias = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Stack direction="column" spacing={3}>
      <Box>
        <Typography
          variant="body2"
          fontWeight={mode === "light" ? 600 : 400}
          sx={{
            color: mode === "light" ? "grey.600" : "grey.300",
            fontSize: 13,
          }}
        >
          27th Oct 22
        </Typography>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
          <Image num={9} />
        </Stack>
      </Box>
      <Box>
        <Typography
          variant="body2"
          fontWeight={mode === "light" ? 600 : 400}
          sx={{
            color: mode === "light" ? "grey.600" : "grey.300",
            fontSize: 13,
          }}
        >
          24th Oct 22
        </Typography>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
          <Image num={3} />
        </Stack>
      </Box>
    </Stack>
  );
};

export default Medias;
