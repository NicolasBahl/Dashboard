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

interface CityHallProps {
  cityHallName: string;
  updated: SvgIconProps;
  onDelete: () => void;
  onSetTimersToTwoMinutes: () => void;
  onSetTimersToFiveMinutes: () => void;
  onSetTimersToTenMinutes: () => void;
}
const CityHallWidget = (props: CityHallProps) => {
  const token = localStorage.getItem("tokenUser");
  const [metrics, setMetrics] = useState<Metrics[]>();

  useEffect(() => {
    getCityHall();
  }, []);

  const renderCityHallInfo = (
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
          The city hall is currently {status.toLowerCase()}.
        </Typography>
      );
    } else if (
      name === "Average Waiting Time" &&
      type === "numeric" &&
      value === -1
    ) {
      return <Typography>We are closed..</Typography>;
    } else if (
      name === "Average Waiting Time" &&
      type === "numeric" &&
      value !== -1
    ) {
      return <Typography>Waiting time : value minutes</Typography>;
    } else {
      return <></>;
    }
  };

  const getCityHall = async () => {
    if (props.cityHallName === "") {
      console.log("");
    } else {
      const res = await fetch(
        `http://localhost:8080/widget/waitingTime?name=${props.cityHallName}`,
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
        Towns Hall
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
              {renderCityHallInfo(value.name, value.type, value.value)}
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

export default CityHallWidget;
