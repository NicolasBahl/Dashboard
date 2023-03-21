import { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Button, TextField, Typography } from "@mui/material";
import CountriesSelect from "./CountriesSelect";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoriesSelect from "./CategoriesSelect";
import CityHallSelect from "./CityHallsSelect";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import JokeCategoriesSelect from "./JokeCategoriesSelect";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PoolSelect from "./PoolSelect";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  const token = localStorage.getItem("tokenUser");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [cityHall, setCityHall] = useState("");
  const [pool, setPool] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [jokeCategory, setJokeCategory] = useState("");
  const localStorageEmail = localStorage.getItem("email");

  const onAddWidgetWeather = async () => {
    const res = await fetch(
      `http://localhost:8080/user/add_widget/${localStorageEmail}`,
      {
        method: "POST",

        body: JSON.stringify({
          name: "weather",
          params: {
            city: city,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
          Authorization: `${token}`,
        },
      }
    );
    if (res.ok) {
      await res.json();
      setCity("");
    } else {
      console.log("Error");
    }
  };

  const onAddWidgetAge = async () => {
    const res = await fetch(
      `http://localhost:8080/user/add_widget/${localStorageEmail}`,
      {
        method: "POST",

        body: JSON.stringify({
          name: "age",
          params: {
            name: name,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
          Authorization: `${token}`,
        },
      }
    );
    if (res.ok) {
      await res.json();
      setName("");
    } else {
      console.log("Error");
    }
  };


  const onAddNewsWidget = async () => {
    const res = await fetch(
      `http://localhost:8080/user/add_widget/${localStorageEmail}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: "news",
          params: {
            country: country,
            category: category,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
          Authorization: `${token}`,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      console.log(json);
    } else {
      console.log("Error");
    }
  };

  const onAddCityHallWidget = async () => {
    const res = await fetch(
      `http://localhost:8080/user/add_widget/${localStorageEmail}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: "mairie",
          params: {
            name: cityHall,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
          Authorization: `${token}`,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      console.log(json);
    } else {
      console.log("Error");
    }
  };

  const onAddPoolWidget = async () => {
    const res = await fetch(
        `http://localhost:8080/user/add_widget/${localStorageEmail}`,
        {
          method: "POST",
          body: JSON.stringify({
            name: "pool",
            params: {
              name: pool,
            },
          }),
          headers: {
            "Content-Type": "application/json",
            charset: "utf-8",
            Authorization: `${token}`,
          },
        }
    );
    if (res.ok) {
      const json = await res.json();
      console.log(json);
    } else {
      console.log("Error");
    }
  };

  const onAddChuckNorrisWidget = async () => {
    const res = await fetch(
      `http://localhost:8080/user/add_widget/${localStorageEmail}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: "jokes",
          params: {
            name: jokeCategory,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
          Authorization: `${token}`,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      console.log(json);
    } else {
      console.log("Error");
    }
  };
  const onChangeParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const onSelectCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const onSelectCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  const onSelectCityHall = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityHall(e.target.value);
  };

  const onSelectJokeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJokeCategory(e.target.value);
  };


  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSelectPool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPool(e.target.value);
  };




  return (
    <Box sx={{ width: "99%", marginTop: "5rem" }}>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="stretch">
        <Grid item xs={6}>
          <Item>
            <ThermostatIcon color="action" />
            <br></br>
            <Typography color={"#ff5943"} component={"h2"} textAlign={"center"}>
              OpenWeather
            </Typography>
            <br></br>

            <TextField
              value={city}
              onChange={onChangeParams}
              name="Search"
              label="Search"
              type="Search"
              id="Search"
              autoComplete="Search"
            />
            <br></br>
            <br></br>
            <Button onClick={onAddWidgetWeather} variant="contained">
              Add
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <NewspaperIcon color="action" />
            <br></br>
            <Typography color={"#ff5943"} component={"h2"} textAlign={"center"}>
              News Feed
            </Typography>
            <br></br>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <CountriesSelect onSelect={onSelectCountry} />
              <br></br>
              <CategoriesSelect onSelect={onSelectCategory} />
            </Box>

            <br></br>
            <Button onClick={onAddNewsWidget} variant="contained">
              Add
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <LocationCityIcon  color="action" />
            <br></br>
            <Typography color={"#ff5943"} component={"h2"} textAlign={"center"}>
              City Hall
            </Typography>
            <br></br>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              
              <br></br>
              <CityHallSelect onSelect={onSelectCityHall} />
              
            </Box>
            
            <br></br>
            <br></br>
            <Button onClick={onAddCityHallWidget} variant="contained">
              Add
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <PsychologyAltIcon  color="action" />
            <br></br>
            <Typography color={"#ff5943"} component={"h2"} textAlign={"center"}>
              Chuck Norris Joke
            </Typography>
            <br></br>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >

              <br></br>
              <JokeCategoriesSelect onSelect={onSelectJokeCategory} />

            </Box>

            <br></br>
            <br></br>
            <Button onClick={onAddChuckNorrisWidget} variant="contained">
              Add
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <QuestionMarkIcon color="action" />
            <br></br>
            <Typography color={"#ff5943"} component={"h2"} textAlign={"center"}>
              Agify
            </Typography>
            <br></br>

            <TextField
              value={name}
              onChange={onChangeName}
              name="Search"
              label="Search"
              type="Search"
              id="Search"
              autoComplete="Search"
            />
            <br></br>
            <br></br>
            <Button onClick={onAddWidgetAge} variant="contained">
              Add
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <LocationCityIcon  color="action" />
            <br></br>
            <Typography color={"#ff5943"} component={"h2"} textAlign={"center"}>
              Pool
            </Typography>
            <br></br>
            <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
            >

              <br></br>
              <PoolSelect onSelect={onSelectPool} />

            </Box>

            <br></br>
            <br></br>
            <Button onClick={onAddPoolWidget} variant="contained">
              Add
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
