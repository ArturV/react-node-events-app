import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactElement, FC } from "react";

export const Register: FC<any> = (): ReactElement => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Register</Typography>
      {/* to do later */}
    </Box>
  );
};
