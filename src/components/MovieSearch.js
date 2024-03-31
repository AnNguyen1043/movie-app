import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "./form";

function MovieSearch({ onSearchIconClick, onEnterPressed }) {
  return (
    <FTextField
      name="query"
      sx={{ width: 300 }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon onClick={onSearchIconClick} />
          </InputAdornment>
        ),
      }}
      onKeyDown={e => { if(e.key === 'Enter') {
        onEnterPressed();
      } }}
    />
  );
}

export default MovieSearch;