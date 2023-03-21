import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const Footer = () => {
  return (
    <footer>
      <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            all about
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            footer
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};
