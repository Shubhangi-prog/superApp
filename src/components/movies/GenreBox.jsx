import React from 'react';

function GenreBox({ genre, isSelected, chooseGenre }) {
    return (
        <div className={`${isSelected ? 'border-4 border-[#11B800]' : ''} rounded-xl p-2`} style={{ background: genre.bg }} onClick={() => chooseGenre(genre.id)} key={genre.id} >
            <p className="mb-3">{genre.name}</p>
            <img src={`/images/genre/${genre.name}.png`} alt={genre.name} />
        </div>
    );
}

export default GenreBox;
