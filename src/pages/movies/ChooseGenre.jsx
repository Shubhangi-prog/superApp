import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Box from '../../components/movies/GenreBox';
import Pill from '../../components/movies/GenrePill';

function ChooseGenre() {
    const navigate = useNavigate();
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [error, setError] = useState(null);

    const genre = [
        { id: 1, name: "Action", bg: "#FF5209" },
        { id: 2, name: "Drama", bg: "#D7A4FF" },
        { id: 3, name: "Romance", bg: "#11B800" },
        { id: 4, name: "Thriller", bg: "#84C2FF" },
        { id: 5, name: "Western", bg: "#902500" },
        { id: 6, name: "Horror", bg: "#7358FF" },
        { id: 7, name: "Fantasy", bg: "#FF4ADE" },
        { id: 8, name: "Music", bg: "#E61E32" },
        { id: 9, name: "Adventure", bg: "#6CD061" },
    ]

    function chooseGenre(genreId) {
        const isSelected = selectedGenre.includes(genreId);
        if (isSelected) {
            setSelectedGenre(prevSelectedGenre => prevSelectedGenre.filter(id => id !== genreId));
        } else {
            setSelectedGenre(prevSelectedGenre => [...prevSelectedGenre, genreId]);
        }
    }

    function removeGenre(genreId) {
        setSelectedGenre(prevSelectedGenre => prevSelectedGenre.filter(id => id !== genreId));
    }

    function handleGoNext() {
        if (selectedGenre.length >= 3) {
            const filteredGenres = genre.filter(genre => selectedGenre.includes(genre.id));
            const genreData = filteredGenres.map(({ id, name }) => ({ id, name }));
            localStorage.setItem("genreData", JSON.stringify(genreData));
            navigate("/user/dashboard");
        } else {
            setError("Minimum 3 categories required.");
        }
    }

    useEffect(() => {
        if (selectedGenre.length >= 3) setError(null);
    }, [selectedGenre]);


    return (
        <div className="h-screen bg-black">
            <div className="flex flex-col md:flex-row gap-6 h-full p-4">
                <div className="w-full flex justify-center items-center">
                    <div className="w-full max-w-sm flex flex-col gap-12">
                        <img src="/images/logo.png" alt="" width={150} />
                        <h1 className="text-xl md:text-6xl text-white font-semibold">Choose your entertainment category</h1>
                        <div className="flex flex-wrap gap-3">
                            {selectedGenre.map((genreId) => {
                                const findGenre = genre.find(genre => genre.id === genreId);
                                if (findGenre) {
                                    return (
                                        <Pill key={findGenre.id} genre={findGenre} removeGenre={removeGenre} />
                                    )
                                }
                                return null;
                            })}

                            {error && <p className="text-[#FF0000] flex items-center">
                                <img src="/images/icons/error.png" width={18} alt="" /><span className="ms-2">{error}</span>
                            </p>}
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="grid grid-cols-3 gap-6 text-white text-lg text-medium">
                            {genre.map((genre) => {
                                return (
                                    <Box key={genre.id} genre={genre} isSelected={selectedGenre.includes(genre.id)} chooseGenre={chooseGenre} />
                                )
                            })}
                        </div>
                        <button className="rounded-3xl bg-[#148A08] text-white py-1 px-4 focus:outline-none float-right mt-6" onClick={() => handleGoNext()}>Next Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseGenre