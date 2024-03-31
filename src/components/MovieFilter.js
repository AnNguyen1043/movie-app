import { Stack, Typography } from "@mui/material";
import { FRadioGroup } from "./form";
import { useEffect, useState } from "react";
import apiService from "../app/apiService";


function MovieFilter({ onGenreChange }) {
  const [genres, setGenres]=useState([]);

  useEffect(()=>{
    const getGenres = async () => {
      try {
        const res = await apiService.get("/3/genre/movie/list");
        const mapped=res.data.genres.map(item=>{
          return {value: item.id, label: item.name}
        })
        setGenres(mapped);
        
      } catch (error) {
        console.log(error);
        
      }
    };
    getGenres();

  },[])


  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Genres
        </Typography>
        <FRadioGroup
          name="genre"
          options={genres}
          row={false}
          onChange={onGenreChange}
        />
      </Stack>

    </Stack>
  );
}

export default MovieFilter;