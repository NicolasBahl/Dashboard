import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {Button, Grid, Typography} from "@mui/material";
import Loader from "./Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import { SvgIconProps } from "@mui/material";
import ButtonsTimer from "./ButtonsTimer";
import Paper from "@mui/material/Paper";


interface Metrics {
  name: string;
  type: string;
  value: string;
}

interface ChuckNorrisProps {
  category: string;
  onDelete: () => void;
  updated: SvgIconProps;
  onSetTimersToTwoMinutes: () => void;
  onSetTimersToFiveMinutes: () => void;
  onSetTimersToTenMinutes: () => void;
}
const ChuckNorrisWidget = (props: ChuckNorrisProps) => {
  const token = localStorage.getItem("tokenUser");
  const [metrics, setMetrics] = useState<Metrics[]>();

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = async () => {
    if (props.category === "") {
      console.log("");
    } else {
      const res = await fetch(
        `http://localhost:8080/widget/chuckNorris?&category=${props.category}`,
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
          <DeleteIcon sx={{ cursor: "pointer" }}/>
        </Button>
        <br />
        Joke
        <br></br>
        <br></br>
        {`Category: ${props.category}`}
        <br></br>
      </Typography>
      <br></br>
      <br></br>

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
              <Typography sx={{ fontWeight: "strong" }} align="center">
                {value.type}
              </Typography>
              <small>
                <a href={value.value}>Read more about the api</a>
              </small>
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

export default ChuckNorrisWidget;
