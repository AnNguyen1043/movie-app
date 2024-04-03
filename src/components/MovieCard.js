import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import { useNavigate } from "react-router-dom";


function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/product/${movie.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="330"
          height="496"
          loading="lazy"
          image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="green iguana"
        />

      </CardActionArea>
    </Card>
  );
}

export default MovieCard;