import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NoTokenContent() {
    const navigate = useNavigate();
  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: "5rem 5rem",
        borderRadiusTop: "25px",
        padding: "2rem 2rem",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}
    >
      <Typography
        textTransform={"uppercase"}
        sx={{ margin: "2rem" }}
        textAlign={"center"}
      >
        No dashboards ? Sign in and discover all the widgets !<Button onClick={() => navigate('/login') } variant="contained">Login</Button>
      </Typography>
    </Box>
  );
}
