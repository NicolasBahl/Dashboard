// import react from "react";
import React from "react";
// import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";
// import Loader from "./Loader";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ButtonsTimer from "./ButtonsTimer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Paper from "@mui/material/Paper";

const NoWidget = () => {
  //   const token = localStorage.getItem("token");

  return (
    <Grid
      item
      xs={10}
      sm={6}
      md={4}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",

          p: 4,
          marginTop: "5rem",
          pading: "auto",
          pt: 0,
          maxWidth: 500,
          flexGrow: 1,
        }}
      >
        <Typography>Weahter</Typography>
        <Button>
          <AddCircleIcon />
        </Button>
      </Paper>
    </Grid>
  );
};

export default NoWidget;
