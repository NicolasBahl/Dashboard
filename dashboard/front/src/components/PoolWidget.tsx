import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {Button, Grid, Typography} from "@mui/material";
import Loader from "./Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonsTimer from "./ButtonsTimer";
import { SvgIconProps } from "@mui/material";
import Paper from "@mui/material/Paper";

interface Metrics {
  name: string;
  type: string;
  value: string | number;
}

interface PoolProps {
  poolName: string;
  updated: SvgIconProps;
  onDelete: () => void;
  onSetTimersToTwoMinutes: () => void;
  onSetTimersToFiveMinutes: () => void;
  onSetTimersToTenMinutes: () => void;
}
const PoolWidget = (props: PoolProps) => {
  const token = localStorage.getItem("token");
  const [metrics, setMetrics] = useState<Metrics[]>();

  useEffect(() => {
    getPool();
  }, []);

  const renderPoolInfo = (
    name: string,
    type: string,
    value: string | number
  ) => {
    if (name === "Name" && type === "text") {
      return <Typography>{value}</Typography>;
    } else if (name === "Status" && type === "text") {
      const status = value as string;
      return (
        <Typography>
          The pool is currently {status.toLowerCase()}.
        </Typography>
      );
    } else if (
      name === "Occupation" &&
      type === "numeric" &&
      value === -1
    ) {
      return <Typography>We are closed..</Typography>;
    } else if (
      name === "Occupation" &&
      type === "numeric" &&
      value !== -1
    ) {
      return <Typography>Occupation : {value} </Typography>;
    } else {
      return <></>;
    }
  };

  const getPool = async () => {
    if (props.poolName === "") {
      console.log("....");
    } else {
      console.log(props.poolName);
      const res = await fetch(
        `http://localhost:8080/widget/poolStatus?name=${props.poolName}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const json = await res.json();
      setMetrics(json.metrics);
    }
  };
  return (
      <Grid item xs={12} sm={6} md={4}>
        <Paper
            variant="outlined"
            sx={{
              p: 4,
              margin: 'auto',
              pt: 0,
              maxWidth: 500,
              flexGrow: 1,
            }}>
      <ButtonsTimer
        onSetTwoMinutes={props.onSetTimersToTwoMinutes}
        onSetFiveMinutes={props.onSetTimersToFiveMinutes}
        onSetTenMinutes={props.onSetTimersToTenMinutes}
      />
      <>{props.updated}</>
      <Typography align="center" color={"#ff5943"}>
        <Button color={"error"} onClick={props.onDelete}>
          <DeleteIcon sx={{ cursor: "pointer" }} />
        </Button>
        <br />
        Pool Status
        <br></br>
        <small>
          Service provided by <strong>strasbourg.eu</strong>
        </small>
        <br></br>
      </Typography>

      {metrics ? (
        metrics.map((value, idx) => {
          return (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <br></br>
              {renderPoolInfo(value.name, value.type, value.value)}
            </Box>
          );
        })
      ) : (
        <Loader />
      )}
        </Paper>
      </Grid>
  );
};

export default PoolWidget;
