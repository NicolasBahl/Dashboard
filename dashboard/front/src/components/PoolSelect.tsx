import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface PoolProps {
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PoolSelect(props: PoolProps) {
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
          label="Choose a pool"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-pool",
          }}
        />
      )}
    />
  );
}

interface poolName {
  name: string;
}

const categories: readonly poolName[] = [
  { name: "Centre nautique de Schiltigheim" },
  { name: "Piscine de Hautepierre" },
  { name: "Piscine de la Hardt" },
  { name: "Piscine de la Kibitzenau" },
  { name: "Piscine de la Robertsau" },
  { name: "Piscine de Lingolsheim" },
  { name: "Piscine d'Ostwald" },
  { name: "Piscine du Wacken" }
];
