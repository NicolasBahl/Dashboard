import * as React from "react";
import { Box } from "@mui/material";
import DialogWidgets from "../components/DialogWidgets";
import NavBar from "../components/NavBar";

const WidgetsPage = () => {
  const token = localStorage.getItem("tokenUser");

  return (
    <>
      <NavBar
        links={token ? ["Home", "Profile"] : ["Home", "Login", "Register"]}
      />

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
        <DialogWidgets />
      </Box>
    </>
  );
};

export default WidgetsPage;
