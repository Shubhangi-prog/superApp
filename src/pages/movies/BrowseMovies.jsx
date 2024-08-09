import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function BrowseMovies() {
    const [movies, setMovies] = useState([]);
    const genreData = JSON.parse(localStorage.getItem('genreData'));
    const genreName = genreData.map(item => item.name);

    async function fetchAllGenreList() {
        const options = {
            method: 'GET',
            url: 'https://advanced-movie-search.p.rapidapi.com/genre/movie/list',
            headers: {
                'X-RapidAPI-Key': '921baa3981mshd5295ede8cd249bp12dbe0jsn8b4388f5c505',
                'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const matchedGenres = response.data.genres.filter(genre => genreName.includes(genre.name));

            let index = 0; const tempMovies = [];
            const interval = setInterval(async () => {
                if (index < matchedGenres.length) {
                    const movies = await searchByGenres(matchedGenres[index].id);
                    tempMovies.push({ genre: matchedGenres[index].name, movies: movies });
                    index++;
                } else {
                    clearInterval(interval);
                    setMovies(tempMovies);
                }
            }, 1100);
        } catch (error) {
            console.error(error);
        }
    }

    async function searchByGenres(genreId) {
        const options = {
            method: 'GET',
            url: 'https://advanced-movie-search.p.rapidapi.com/discover/movie',
            params: { with_genres: genreId, page: '1' },
            headers: {
                'X-RapidAPI-Key': '921baa3981mshd5295ede8cd249bp12dbe0jsn8b4388f5c505',
                'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            return response.data.results;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAllGenreList()
    }, []);


    // console.log(movies)

    return (
        <div className="bg-black min-h-screen">
            <div className="container mx-auto p-4 md:p-0">
                <div className="flex justify-between pt-5">
                    <Link to="/movies/genre"><img src="/images/logo.png" style={{ height: "40px" }} alt="" /></Link>
                    <Link to="/user/dashboard"><img src="/images/profile/user.small.png" style={{ height: "40px" }} alt="" /></Link>
                </div>
                <div className="flex flex-col gap-5 py-5">
                    <p className="text-white text-xl">Entertainment according to your choice</p>
                    {movies.length > 0 ? (
                        movies.map((name, gkey) => (
                            <div key={gkey}>
                                <p className="text-[#878787] text-xl font-medium my-5">{name.genre}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {name.movies && name.movies.length > 0 ? (
                                        name.movies.slice(0, 4).map((movie, mkey) => (
                                            <div key={mkey}>
                                                <img src={movie.poster_path} alt="" />
                                                <p className="text-white text-lg my-4" key={mkey}>{movie.original_title}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-red-500">Failed to load movies for this genre. Please refresh the page.</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-green-500 text-2xl fixed inset-0 flex items-center justify-center">Loading Movies, please wait ...</p>
                    )}
                </div>

            </div>
        </div>
    )
}

export default BrowseMovies