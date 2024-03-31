import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
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
          image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="green iguana"
        />
        
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;