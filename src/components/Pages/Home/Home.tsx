import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactElement, FC } from "react";

export const Home: FC<any> = (): ReactElement => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "whitesmoke",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Home</Typography>
      </Box>
      <img
        className="imgEvent"
        src="https://ai.iti.gov.eg/wp-content/uploads/2020/05/event.jpg"
        alt="event"
      />
    </>
  );
};
