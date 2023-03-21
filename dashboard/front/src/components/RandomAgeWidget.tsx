import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {Button, Grid, Typography} from "@mui/material";
import Loader from "./Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import { SvgIconProps } from "@mui/material";
import ButtonsTimer from "./ButtonsTimer";
import ElderlyIcon from '@mui/icons-material/Elderly';
import Paper from "@mui/material/Paper";


interface Metrics {
  name: string;
  type: string;
  value: number;
}

interface RandomAgeProps {
  name: string;
  onDelete: () => void;
  updated: SvgIconProps;
  onSetTimersToTwoMinutes: () => void;
  onSetTimersToFiveMinutes: () => void;
  onSetTimersToTenMinutes: () => void;
}
const RandomAgeWidget = (props: RandomAgeProps) => {
  const token = localStorage.getItem("tokenUser");
  const [metrics, setMetrics] = useState<Metrics[]>();

  const getSentence = (age: number ) => {
    if(age > 5 && age <=10){
      return <Typography>I'm a baby !</Typography>
    }
    else if(age > 10 && age < 20){
      return <Typography>I'm a teenager !</Typography>
    }
    else if(age > 20 && 35){
      return <Typography>I'm an adult ! </Typography>
    }
    else if(age > 35 && age < 60){
      return <Typography>I'm getting older</Typography>
    }
    else if(age >= 60 && age < 90){
      return <Typography>I'm old !</Typography>
    }
    else{
      <Typography>
        <ElderlyIcon/>
      </Typography>
    }

  }

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = async () => {
    if (props.name === "") {
      console.log("");
    } else {
      const res = await fetch(
        `http://localhost:8080/widget/random_age?name=${props.name}`,
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
        Agify.io
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
                My name is {value.name} and I'm {value.value} years old.
              </Typography>
              {getSentence(value.value)}
               
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

export default RandomAgeWidget;
