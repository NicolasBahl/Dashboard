import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NewsFeedWidget from "../components/NewsFeedWidget";
import NoTokenContent from "../components/NoTokenContent";
import UpdateIcon from "@mui/icons-material/Update";
import WeatherWidget from "../components/WeatherWidget";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Grid } from "@mui/material";
import Loader from "../components/Loader";
import DialogWidgets from "../components/DialogWidgets";
import CityHallWidget from "../components/CityHallWidget";
import ChuckNorrisWidget from "../components/ChuckNorrisWidget";
import RandomAgeWidget from "../components/RandomAgeWidget";
import NoWidget from "../components/NoWidgetSelect";
import PoolWidget from "../components/PoolWidget";

interface WeatherWidgetParams {
  params: {
    city: string;
  };
  timers: number;
}

interface NewsFeedParams {
  params: {
    country: string;
    category: string;
  };
  timers: number;
}

interface CityHallParams {
  params: {
    name: string;
  };
  timers: number;
}

interface ChuckNorrisParams {
  params: {
    name: string;
  };
  timers: number;
}

interface AgeParams {
  params: {
    name: string;
  };
  timers: number;
}

interface PoolParams {
  params: {
    name: string;
  };
  timers: number;
}

const Layout = () => {
  const token = localStorage.getItem("tokenUser");
  const tokenUserGoolge = localStorage.getItem("tokenGoogleUser");
  const localStorageEmail = localStorage.getItem("email");
  const [params, setParams] = useState<WeatherWidgetParams[]>();
  const [newsFeedParams, setNewsFeedParams] = useState<NewsFeedParams[]>();
  const [AgeParams, setAgeParams] = useState<AgeParams[]>();
  const [CityHallParams, setCityHallParams] = useState<CityHallParams[]>();
  const [PoolParams, setPoolParams] = useState<PoolParams[]>();
  const [jokesParams, setJokesParams] = useState<ChuckNorrisParams[]>();
  const [isWidget, setIsWidget] = useState(false);
  const [timers, setTimers] = useState(120000);
  const [isUpdate, setUpdate] = useState(false);
  useEffect(() => {
    getWeatherWigets();
    getFeedNedds();
    getRandomAgeWidget();
    getCityHallWidget();
    getChuckNorrisWidget();
    getPoolWidget();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getWeatherWigets();
      getChuckNorrisWidget();
      getFeedNedds();
      getRandomAgeWidget();
      getCityHallWidget();
      getPoolWidget();
      setUpdate(true);
      console.log("time....", timers);
    }, timers);

    setUpdate(false);
  }, []);

  const getPoolWidget = async () => {
    if (localStorageEmail) {
      const res = await fetch(
          `http://localhost:8080/user/${localStorageEmail}/pool`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
      );
      if (res.status === 200) {
        const json = await res.json();
        setIsWidget(true);
        setPoolParams(json);
      } else if (res.status === 400) {
        return <DialogWidgets />;
      } else {
        console.log(res);
      }
    } else {
      console.log("error");
    }
  };

  const getCityHallWidget = async () => {
    if (localStorageEmail) {
      const res = await fetch(
        `http://localhost:8080/user/${localStorageEmail}/mairie`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const json = await res.json();
        setIsWidget(true);
        setCityHallParams(json);
      } else if (res.status === 400) {
        setIsWidget(false);
      } else {
        console.log(res);
      }
    } else {
      console.log("error");
    }
  };

  const getWeatherWigets = async () => {
    if (localStorageEmail) {
      const res = await fetch(
        `http://localhost:8080/user/${localStorageEmail}/weather`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const json = await res.json();
        setIsWidget(true);
        setParams(json);
      } else if (res.status === 400) {
        return <NoWidget />;
      } else {
        console.log(res);
      }
    } else {
      console.log("error");
    }
  };

  const getChuckNorrisWidget = async () => {
    if (localStorageEmail) {
      const res = await fetch(
        `http://localhost:8080/user/${localStorageEmail}/jokes`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const json = await res.json();
        setIsWidget(true);
        setJokesParams(json);
      } else if (res.status === 400) {
        return <DialogWidgets />;
      } else {
        console.log(res);
      }
    } else {
      console.log("error");
    }
  };

  const getRandomAgeWidget = async () => {
    if (localStorageEmail) {
      const res = await fetch(
        `http://localhost:8080/user/${localStorageEmail}/age`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const json = await res.json();
        setIsWidget(true);
        setAgeParams(json);
      } else if (res.status === 400) {
        return <DialogWidgets />;
      } else {
        console.log(res);
      }
    } else {
      console.log("error");
    }
  };

  const onDeleteRandomAge = async (name: string) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/deleteWidget`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "age",
          params: {
            name: name,
          },
          timers: timers,
        }),
      }
    );
    const json = await res.json();
    console.log(json);
    window.location.reload();
  };

  const onDelete = async (city: string) => {
    console.log(city);
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/deleteWidget`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "weather",
          params: {
            city: city,
          },
          timers: timers,
        }),
      }
    );
    const json = await res.json();
    console.log(json);
    window.location.reload();
  };

  const onDeletePool = async (name: string) => {
    const res = await fetch(
        `http://localhost:8080/user/${localStorageEmail}/deleteWidget`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "pool",
            params: {
              name: name,
            },
            timers: timers,
          }),
        }
    );
    const json = await res.json();
    console.log(json);
    getPoolWidget();
  };

  const onDeleteCityHall = async (name: string) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/deleteWidget`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "mairie",
          params: {
            name: name,
          },
          timers: timers,
        }),
      }
    );
    const json = await res.json();
    console.log(json);
    window.location.reload();
  };

  const onDeleteJoke = async (name: string) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/deleteWidget`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "jokes",
          params: {
            name: name,
          },
          timers: timers,
        }),
      }
    );
    const json = await res.json();
    console.log(json);
    getChuckNorrisWidget();
    window.location.reload();
  };

  const onDeleteNews = async (country: string, category: string) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/deleteWidget`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "news",
          params: {
            country: country,
            category: category,
          },
          timers: timers,
        }),
      }
    );
    const json = await res.json();
    console.log(json);
    window.location.reload();
  };

  const onSetTimersToTwoMinutes = async (weather: WeatherWidgetParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "weather",
            params: {
              city: weather.params.city,
            },
            timers: weather.timers,
          },
          new: {
            name: "weather",
            params: {
              city: weather.params.city,
            },
            timers: weather.timers,
          },
        }),
      }
    );
    const json = await res.json();
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
    console.log(json);
  };

  const onSetTimersToFiveMinutes = async (weather: WeatherWidgetParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "weather",
            params: {
              city: weather.params.city,
            },
            timers: weather.timers,
          },
          new: {
            name: "weather",
            params: {
              city: weather.params.city,
            },
            timers: 300000,
          },
        }),
      }
    );
    const json = await res.json();
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToTenMinutes = async (weather: WeatherWidgetParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "weather",
            params: {
              city: weather.params.city,
            },
            timers: weather.timers,
          },
          new: {
            name: "weather",
            params: {
              city: weather.params.city,
            },
            timers: 600000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log(json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
    // getWeatherWigets();
  };

  const getFeedNedds = async () => {
    if (localStorageEmail) {
      const res = await fetch(
        `http://localhost:8080/user/${localStorageEmail}/news`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      console.log(json);
      setIsWidget(true);
      setNewsFeedParams(json);
    } else {
      console.log("error");
    }
  };

  const onSetTimersToTwoMinutesFeeds = async (feeds: NewsFeedParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "news",
            params: {
              country: feeds.params.country,
              category: feeds.params.category,
            },
            timers: feeds.timers,
          },
          new: {
            name: "news",
            params: {
              country: feeds.params.country,
              category: feeds.params.category,
            },
            timers: 120000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToFiveMinutesFeeds = async (feeds: NewsFeedParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "news",
            params: {
              country: feeds.params.country,
              category: feeds.params.category,
            },
            timers: feeds.timers,
          },
          new: {
            name: "news",
            params: {
              country: feeds.params.country,
              category: feeds.params.category,
            },
            timers: 300000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToTenMinutesFeeds = async (feeds: NewsFeedParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "news",
            params: {
              country: feeds.params.country,
              category: feeds.params.category,
            },
            timers: feeds.timers,
          },
          new: {
            name: "news",
            params: {
              country: feeds.params.country,
              category: feeds.params.category,
            },
            timers: 600000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToTwoMinutesPool = async (pool: PoolParams) => {
    const res = await fetch(
        `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old: {
              name: "pool",
              params: {
                name: pool.params.name,
              },
              timers: pool.timers,
            },
            new: {
              name: "pool",
              params: {
                name: pool.params.name,
              },
              timers: 120000,
            },
          }),
        }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToFiveMinutesPool = async (pool: PoolParams) => {
    const res = await fetch(
        `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old: {
              name: "pool",
              params: {
                name: pool.params.name,
              },
              timers: pool.timers,
            },
            new: {
              name: "pool",
              params: {
                name: pool.params.name,
              },
              timers: 300000,
            },
          }),
        }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToTenMinutesPool = async (pool: PoolParams) => {
    const res = await fetch(
        `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old: {
              name: "pool",
              params: {
                name: pool.params.name,
              },
              timers: pool.timers,
            },
            new: {
              name: "pool",
              params: {
                name: pool.params.name,
              },
              timers: 600000,
            },
          }),
        }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToTwoMinutesCityHall = async (cityHalls: CityHallParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "mairie",
            params: {
              name: cityHalls.params.name,
            },
            timers: cityHalls.timers,
          },
          new: {
            name: "mairie",
            params: {
              name: cityHalls.params.name,
            },
            timers: 120000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToFiveMinutesCityHall = async (
    cityHalls: CityHallParams
  ) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "mairie",
            params: {
              name: cityHalls.params.name,
            },
            timers: cityHalls.timers,
          },
          new: {
            name: "mairie",
            params: {
              name: cityHalls.params.name,
            },
            timers: 300000
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToTenMinutesCityHall = async (cityHalls: CityHallParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "mairie",
            params: {
              name: cityHalls.params.name,
            },
            timers: cityHalls.timers,
          },
          new: {
            name: "mairie",
            params: {
              name: cityHalls.params.name,
            },
            timers: 600000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToTwoMinutesJoke = async (joke: ChuckNorrisParams) => {
    console.log(timers);
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "jokes",
            params: {
              name: joke.params.name,
            },
            timers: joke.timers,
          },
          new: {
            name: "jokes",
            params: {
              name: joke.params.name,
            },
            timers: 120000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToFiveMinutesJoke = async (joke: ChuckNorrisParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "jokes",
            params: {
              name: joke.params.name,
            },
            timers: joke.timers,
          },
          new: {
            name: "jokes",
            params: {
              name: joke.params.name,
            },
            timers: 300000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToTenMinutesJoke = async (joke: ChuckNorrisParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "jokes",
            params: {
              name: joke.params.name,
            },
            timers: joke.timers,
          },
          new: {
            name: "jokes",
            params: {
              name: joke.params.name,
            },
            timers: 600000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToTwoMinutesAge = async (age: AgeParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "age",
            params: {
              name: age.params.name,
            },
            timers: age.timers,
          },
          new: {
            name: "age",
            params: {
              name: age.params.name,
            },
            timers: 120000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToFiveMinutesAge = async (age: AgeParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "age",
            params: {
              name: age.params.name,
            },
            timers: age.timers,
          },
          new: {
            name: "age",
            params: {
              name: age.params.name,
            },
            timers: 300000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  const onSetTimersToTenMinutesAge = async (age: AgeParams) => {
    const res = await fetch(
      `http://localhost:8080/user/${localStorageEmail}/updateWidget`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old: {
            name: "age",
            params: {
              name: age.params.name,
            },
            timers: age.timers,
          },
          new: {
            name: "age",
            params: {
              name: age.params.name,
            },
            timers: 600000,
          },
        }),
      }
    );
    const json = await res.json();
    console.log("json", json);
    setTimers(JSON.parse(json.widgets).widgets[0].timers);
  };

  return (
    <>
      {!token && <NoTokenContent />}
      <NavBar
        links={
          token || tokenUserGoolge
            ? ["Profile", "Widgets"]
            : ["Home", "Login", "Register"]
        }
      />
      <Grid container spacing={4} sx={{
        mt: 8,
        p: 4
      }}
            alignItems="stretch"
            justifyContent="center"

      >

        {isWidget &&
            PoolParams?.map((pool, idx) => {
              return (
                  <PoolWidget
                      onDelete={() => onDeletePool(pool.params.name)}
                      key={`pool-${idx}-${pool.params.name}`}
                      poolName={pool.params.name}
                      onSetTimersToTwoMinutes={() => onSetTimersToTwoMinutesPool(pool)}
                      onSetTimersToFiveMinutes={() => onSetTimersToFiveMinutesPool(pool)}
                      onSetTimersToTenMinutes={() => onSetTimersToTenMinutesPool(pool)}
                      updated={
                        isUpdate ? (
                            <UpdateIcon sx={{ color: "#ff5943" }} />
                        ) : (
                            <HourglassTopIcon sx={{ color: "#ff5943" }} />
                        )
                      }
                  />
              );
            })}

      {isWidget &&
        CityHallParams?.map((cityHall, idx) => {
          return (
            <CityHallWidget
              onDelete={() => onDeleteCityHall(cityHall.params.name)}
              key={`cityHall-${idx}-${cityHall.params.name}`}
              cityHallName={cityHall.params.name}
              onSetTimersToTwoMinutes={() =>
                onSetTimersToTwoMinutesCityHall(cityHall)
              }
              onSetTimersToFiveMinutes={() =>
                onSetTimersToFiveMinutesCityHall(cityHall)
              }
              onSetTimersToTenMinutes={() =>
                onSetTimersToTenMinutesCityHall(cityHall)
              }
              updated={
                isUpdate ? (
                  <UpdateIcon sx={{ color: "#ff5943" }} />
                ) : (
                  <HourglassTopIcon sx={{ color: "#ff5943" }} />
                )
              }
            />
          );
        })}

      {isWidget &&
        params?.map((city, idx) => {
          return (
            <WeatherWidget
              key={`${idx}-${city.params.city}`}
              params={city.params.city}
              onDelete={() => onDelete(city.params.city)}
              onSetTimersToTwoMinutes={() => onSetTimersToTwoMinutes(city)}
              onSetTimersToFiveMinutes={() => onSetTimersToFiveMinutes(city)}
              onSetTimersToTenMinutes={() => onSetTimersToTenMinutes(city)}
              updated={
                isUpdate ? (
                  <UpdateIcon sx={{ color: "#ff5943" }} />
                ) : (
                  <HourglassTopIcon sx={{ color: "#ff5943" }} />
                )
              }
            />
          );
        })}

      {isWidget &&
        jokesParams?.map((value, idx) => {
          return (
            <ChuckNorrisWidget
              key={`chuckNorris-${idx}`}
              category={value.params.name}
              onDelete={() => onDeleteJoke(value.params.name)}
              updated={
                isUpdate ? (
                  <UpdateIcon sx={{ color: "#ff5943" }} />
                ) : (
                  <HourglassTopIcon sx={{ color: "#ff5943" }} />
                )
              }
              onSetTimersToTwoMinutes={() => onSetTimersToTwoMinutesJoke(value)}
              onSetTimersToFiveMinutes={() =>
                onSetTimersToFiveMinutesJoke(value)
              }
              onSetTimersToTenMinutes={() => onSetTimersToTenMinutesJoke(value)}
            />
          );
        })}

      {isWidget &&
        AgeParams?.map((value, idx) => {
          return (
            <RandomAgeWidget
              key={`randomAgeWidget-${idx}`}
              name={value.params.name}
              onDelete={() => onDeleteRandomAge(value.params.name)}
              updated={
                isUpdate ? (
                  <UpdateIcon sx={{ color: "#ff5943" }} />
                ) : (
                  <HourglassTopIcon sx={{ color: "#ff5943" }} />
                )
              }
              onSetTimersToTwoMinutes={() => onSetTimersToTwoMinutesAge(value)}
              onSetTimersToFiveMinutes={() =>
                onSetTimersToFiveMinutesAge(value)
              }
              onSetTimersToTenMinutes={() => onSetTimersToTenMinutesAge(value)}
            />
          );
        })}

        {isWidget &&
            newsFeedParams?.map((value, idx) => {
              return (
                  <NewsFeedWidget
                      onSetTimersToTwoMinutes={() =>
                          onSetTimersToTwoMinutesFeeds(value)
                      }
                      onSetTimersToFiveMinutes={() =>
                          onSetTimersToFiveMinutesFeeds(value)
                      }
                      onSetTimersToTenMinutes={() =>
                          onSetTimersToTenMinutesFeeds(value)
                      }
                      key={`${idx}-${value}}`}
                      onDelete={() =>
                          onDeleteNews(value.params.country, value.params.category)
                      }
                      firstParam={value.params.country.toLowerCase()}
                      secondParam={value.params.category.toLowerCase()}
                      updated={
                        isUpdate ? (
                            <UpdateIcon sx={{ color: "#ff5943" }} />
                        ) : (
                            <HourglassTopIcon sx={{ color: "#ff5943" }} />
                        )
                      }
                  />
              );
            })}
      </Grid>
    </>
  );
};

export default Layout;
