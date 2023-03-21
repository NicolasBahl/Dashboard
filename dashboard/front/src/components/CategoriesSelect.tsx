import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface CategoriesSelectProps {
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CategoriesSelect(props: CategoriesSelectProps) {
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
          label="Choose a category"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-category",
          }}
        />
      )}
    />
  );
}

interface Category {
  name: string;
}

const categories: readonly Category[] = [
  { name: "technology" },
  { name: "business" },
  { name: "entertainment" },
  { name: "health" },
  { name: "sports" },
];
