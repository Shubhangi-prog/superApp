import React from 'react'
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="text-green-500 fixed inset-0 flex items-center justify-center">
            <div className="text-center px-5">
                <p className="text-4xl font-semibold">Page Not Found</p>
                <p className="my-10">The page you are looking for might be removed or is temporarily unavailable</p>
                <Link className="rounded-3xl bg-[#148A08] text-white p-2 px-5 focus:outline-none" to="/">Back to Home</Link>
            </div>
        </div>
    )
}

export default NotFound