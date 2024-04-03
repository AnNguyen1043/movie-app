import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Grid } from "@mui/material";
import MovieFilter from "../components/MovieFilter";
import MovieSearch from "../components/MovieSearch";
import MovieList from "../components/MovieList";
import MoviePagination from "../components/MoviePagination";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { set } from "lodash";

const defaultValues = {
  genre: null,
  query: ""
};

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterMode, setFilterMode] = useState('search');

  const [movieStores, setMovieStores] = useState({
    fetchStutus: 'idle', // idle, loading, success, error
    page: 1,
    pageSize: 20,
    movies: [],
  });

  const methods = useForm({
    defaultValues,
  });

  const { getValues } = methods

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        setFilterMode('default')
        setMovieStores(prev => {
          return {
            ...prev,
            fetchStutus: 'loading'
          }
        })
        const res = await apiService.get("/3/discover/movie");
        setMovieStores(prev => {
          return {
            ...prev,
            movies: res.data.results,
            fetchStutus: 'success'
          }

        })
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setPage(1);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
        setMovieStores(prev => {
          return {
            ...prev,
            fetchStutus: 'error'
          }
        })
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  const handleOnGenreChange = async (event) => {
    const genreId = event.target.value
    setLoading(true);
    try {
      setFilterMode('by_genre')
      const res = await apiService.get("/3/discover/movie", { params: { with_genres: genreId } });
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
      setPage(1);
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);

  }

  const searchMovies = async () => {
    setLoading(true);

    try {
      setFilterMode('search')
      const query = getValues('query')
      const res = await apiService.get("/3/search/movie", { params: { query } });
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
      setPage(1);
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

    setLoading(false)
  }

  const handleOnPaginationChange = async (page) => {
    setLoading(true);

    if (filterMode === 'search') {
      try {
        const query = getValues('query')
        const res = await apiService.get("/3/search/movie", { params: { query, page } });
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setPage(page);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    } else if (filterMode === 'by_genre') {
      try {
        console.log(page);
        const genreId = getValues('genre');
        const res = await apiService.get("/3/discover/movie", { params: { with_genres: genreId, page } });
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setPage(page);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    } else {
      setLoading(true);
      try {
        const res = await apiService.get("/3/discover/movie", { params: { page } });
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setPage(page);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    }

    setLoading(false)
  }

  return (
    <Container maxWidth="xl" style={{ paddingTop: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={3} >
          <FormProvider methods={methods}>
            <MovieFilter onGenreChange={handleOnGenreChange} />
          </FormProvider>
        </Grid>
        <Grid item xs={9} >
          <FormProvider methods={methods} onSubmit={(e) => { e.preventDefault() }}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
              mb={2}
            >
              <MovieSearch onSearchIconClick={searchMovies} onEnterPressed={searchMovies} />

            </Stack>
          </FormProvider>

          {["idle", "loading"].includes(movieStores.fetchStutus) && <LoadingScreen />}
          {movieStores.fetchStutus === 'error' && <Alert severity="error">Something went wrong</Alert>}
          {movieStores.fetchStutus === 'success' && <><MovieList movies={movies} />
            <MoviePagination page={page} totalPages={totalPages} onPaginationChange={(_, page) => handleOnPaginationChange(page)} /></>}

          <Stack spacing={1}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <MovieList movies={movies} />
                )}
              </>
            )}


          </Stack>

        </Grid>
      </Grid>
    </Container>

  );
}


export default HomePage;
