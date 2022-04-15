import { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCards';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import '../Style/FilmsPage.css';

const FilmsPage = () => {
    interface Character {
        id: number;
        name: string;
        birth_year: string;
        gender: string;
        mass: number;
    }

    const [movies, setMovies] = useState([]);
    const [isMoviesLoading, setIsMoviesLoading] = useState(false);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isCharactersLoaded, setIsLoaded] = useState(false);
    const [isCharactersLoading, setIsLoading] = useState(false);
    const filmsUrl = 'https://swapi.dev/api/films/';

    useEffect(() => {
        setIsMoviesLoading(true);
        fetch(filmsUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    setMovies(result.results);
                    setIsMoviesLoading(false);
                },
                (error) => { throw Error("Uh oh! Something went wrong while loading the cast :( \nPlease try again later!") })
    }, []);

    function LoadCharacters(characterUrls: []) {
        setIsLoaded(false);
        setIsLoading(true);
        Promise.all(
            characterUrls.map((url) => {
                return fetch(url)
                    .then((response) => {
                        if (!response.ok) {
                            setIsLoaded(false);
                            throw Error("Uh oh! Something went wrong while loading the cast :( \nPlease try again later!");
                        }
                        return response.json();
                    });
            }))
            .then((charData) => {
                setCharacters(charData);
                setIsLoaded(true);
                setIsLoading(false);
            });
    }

    return (
        <div className='filmsPageContainer'>
            <div className='movieCollection'>
                {
                    isMoviesLoading
                        ?
                        <div className='loader'>
                            <CircularProgress sx={{ textAlign: "center" }} color="info" />
                        </div>
                        :
                        movies.map((movie, idx) => {
                            return (
                                <>
                                    <MovieCard key={idx} data={movie} onClick={LoadCharacters} />
                                </>
                            )
                        })
                }
            </div>

            <div className="charactersTableContainer">
                {
                    isCharactersLoaded
                        ?
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500, minHeight: 500 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell size="small" align="center"></TableCell>
                                        <TableCell size="small" align="center">Name</TableCell>
                                        <TableCell size="small" align="center">Birth year</TableCell>
                                        <TableCell size="small" align="center">Gender</TableCell>
                                        <TableCell size="small" align="center">Mass&nbsp;(kg)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        characters.map((character, idx) => (
                                            <TableRow key={++idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell size="small" align="center">{++idx}</TableCell>
                                                <TableCell size="small" align="center">{character.name}</TableCell>
                                                <TableCell size="small" align="center">{character.birth_year}</TableCell>
                                                <TableCell size="small" align="center">{character.gender}</TableCell>
                                                <TableCell size="small" align="center">{character.mass}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : isCharactersLoading
                            ?
                            <div className='loader'>
                                <CircularProgress sx={{ textAlign: "center" }} color="info" />
                            </div>
                            :
                            <Typography sx={{ textAlign: "center" }} variant="h6" component="div">
                                Please select a movie above to view its cast.
                            </Typography>
                }
            </div>
        </div>
    )
}

export default FilmsPage;