import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import Loader from "./Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";
import ButtonsTimer from "./ButtonsTimer";
import { SvgIconProps } from "@mui/material";

interface Metrics {
  name: string;
  type: string;
  value: string;
}

interface NewsFeedProps {
  firstParam: string;
  secondParam: string;
  updated: SvgIconProps;
  onDelete: () => void;
  onSetTimersToTwoMinutes: () => void;
  onSetTimersToFiveMinutes: () => void;
  onSetTimersToTenMinutes: () => void;
}
const NewsFeedWidget = (props: NewsFeedProps) => {
  const token = localStorage.getItem("tokenUser");
  const [metrics, setMetrics] = useState<Metrics[]>();

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    if (props.firstParam === "" || props.secondParam === "") {
      console.log("");
    } else {
      const res = await fetch(
        `http://localhost:8080/widget/newsFeed?country=${props.firstParam}&category=${props.secondParam}`,
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
    <Box
      sx={{
        flexGrow: 1,
        margin: "5rem 5rem",
        borderRadiusTop: "25px",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}
    >
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
        News Feed
        <br></br>
        <br></br>
        {`Category: ${props.secondParam}`}
        <br></br>
        <img
          width="50"
          height="50"
          src={`https://flagcdn.com/w20/${props.firstParam.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w40/${props.firstParam.toLowerCase()}.png 2x`}
          alt=""
        />
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
              <Link
                component="button"
                variant="body2"
                href={value.type}
                sx={{
                  fontWeight: "strong",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                {value.name}
              </Link>
              <br></br>
              <Typography sx={{ fontWeight: "strong" }} align="center">
                {value.value !== "null" ? `Written by ${value.value}` : ""}
              </Typography>
            </Box>
          );
        })
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default NewsFeedWidget;
