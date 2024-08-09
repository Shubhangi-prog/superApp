import React, { useState } from 'react';

function Notes() {
    const [getNotes, setNotes] = useState(localStorage.getItem("notes"));

    return (
        <div className="bg-[#F1C75B] p-5 w-full rounded-2xl overflow-y-auto">
            <h4 className="text-2xl font-medium mb-5">All notes</h4>
            <textarea className="bg-[#F1C75B] w-full h-52 md:h-5/6 focus:outline-none" value={getNotes || ''} onInput={(e) => { setNotes(e.target.value); localStorage.setItem("notes", e.target.value) }}></textarea>
        </div>
    )
}

export default Notes