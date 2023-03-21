import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Card, Grid, Typography } from "@mui/material";
import Loader from "./Loader";
import SevereColdIcon from "@mui/icons-material/SevereCold";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonsTimer from "./ButtonsTimer";
import { SvgIconProps } from "@mui/material";
import Paper from "@mui/material/Paper";

interface Metrics {
    name: string;
    type: string;
    value: string | number;
}

interface WeatherWidgetProps {
    params: string;
    updated: SvgIconProps;
    onDelete: () => void;
    onSetTimersToTwoMinutes: () => void;
    onSetTimersToFiveMinutes: () => void;
    onSetTimersToTenMinutes: () => void;
}
const WeatherWidget = (props: WeatherWidgetProps) => {
    const token = localStorage.getItem("token");
    const [metrics, setMetrics] = useState<Metrics[]>();

    useEffect(() => {
        getWeather();
        // console.log(metrics);
    }, []);

    const feeling = (temp: number | string) => {
        if (temp < 10) {
            return (
                <Typography sx={{ color: "#ff5943" }} align="left">
                    <SevereColdIcon sx={{ color: "#ff5943" }} />
                    It's so cold !
                </Typography>
            );
        } else if (temp > 10 && temp < 15) {
            return (
                <Typography sx={{ color: "#ff5943" }} align="left">
                    <AccessibilityNewIcon sx={{ color: "#ff5943" }} />
                    It's a little bit cold but nice for a walk !
                </Typography>
            );
        } else {
            return (
                <Typography sx={{ color: "#ff5943" }} align="left">
                    <WbSunnyIcon sx={{ color: "#ff5943" }} />
                    The Weather is so nice !
                </Typography>
            );
        }
    };

    const getWeather = async () => {
        if (props.params === undefined || props.params === "") {
            console.log("undefined");
        } else {
            const res = await fetch(
                `http://localhost:8080/widget/currentWeather?city=${props.params}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
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
                <Grid container>
                    <>{props.updated}</>
                    <Grid item xs={8}>
                        <Typography align="center" color={"#ff5943"}>
                            Current Weather
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={props.onDelete} >
                            <DeleteIcon color="error" sx={{ cursor: "pointer" }} />
                        </Button>
                    </Grid>
                </Grid>
                {metrics ? (
                    metrics.map((value, idx) => {
                        return (
                            <Grid container
                                  direction="column"
                                  alignItems="flex-start"
                                  key = {idx}
                                  className = "test"
                            >
                                <Grid item className={"testChild"} xs={8}>
                                    <Typography
                                        textTransform={"uppercase"}
                                        sx={{ fontWeight: "strong" }}
                                        align="center"
                                    >
                                        {value.name === "City" && value.value}
                                    </Typography>
                                </Grid>
                                <Grid item container
                                      direction="row"
                                      alignItems="stretch"
                                      justifyContent="flex-start"
                                >
                                    <Grid item xs={8}>
                                        <Typography variant="h2"
                                                    align="left">
                                            {value.name === "Temperature" &&
                                                `${
                                                    value.value
                                                }°C`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={{ fontWeight: "strong" }} align="right">
                                            {value.name === "Weather" &&
                                                `${value.value}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: "strong" }} align="left">
                                        {value.name === "Feels Like" &&
                                            `It ${value.name.toLowerCase()}: ${value.value}°C`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: "strong" }} align="left">
                                        {value.name === "Humidity" &&
                                            `${value.name}: ${
                                                value.value
                                            }%.`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {value.name === "Temperature" && feeling(value.value)}
                                </Grid>
                            </Grid>
                        );
                    })
                ) : (
                    <Loader />
                )}


            </Paper>
        </Grid>
    );
};

export default WeatherWidget;
