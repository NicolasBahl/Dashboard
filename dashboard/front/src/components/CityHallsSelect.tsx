import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface CityHallsProps {
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CityHallSelect(props: CityHallsProps) {
  return (
    <Autocomplete
      fullWidth
      id="country-select-demo"
      sx={{ width: 300 }}
      onSelect={props.onSelect}
      options={categories}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a city hall"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-cityHall",
          }}
        />
      )}
    />
  );
}

interface cityHallName {
  name: string;
}

const categories: readonly cityHallName[] = [
  { name: "Ville et Eurométropole de Strasbourg" },
  { name: "Hautepierre" },
  { name: "Neuhof-Meinau" },
  { name: "Robertsau" },
  { name: "Elsau" },
  { name: "Koenigshoffen" },
  { name: "Montagne-Verte" },
  { name: "Conseil des XV" },
  { name: "Centre ville" },
];
