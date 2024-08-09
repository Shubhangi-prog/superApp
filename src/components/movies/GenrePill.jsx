import React from 'react';

function GenrePill({ genre, removeGenre }) {
    return (
        <button key={genre.id} className="rounded-3xl bg-[#148A08] text-white py-1 px-4 focus:outline-none" >
            {genre.name}&emsp;
            <span className="text-[#085C00]" onClick={(e) => { e.stopPropagation(); removeGenre(genre.id); }} >X</span>
        </button>
    );
}

export default GenrePill;
