import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer>
      <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
            aria-label="copyright"
          >
            Copyright 2023
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};
