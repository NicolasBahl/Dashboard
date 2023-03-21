import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface SuccessProps {
  message: string;
}

const successAlert = (props: SuccessProps) => {
  return (
    <Stack sx={{ width: "100%", margin: "20px 0px" }} spacing={4}>
      <Alert severity="success">{props.message}</Alert>
    </Stack>
  );
};

export default successAlert;
