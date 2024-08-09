import React from 'react';
import { Link } from "react-router-dom";

import Timer from '../../components/dashboard/Timer';
import Weather from '../../components/dashboard/Weather';
import News from '../../components/dashboard/News';
import Notes from '../../components/dashboard/Notes';
import UserInfo from '../../components/dashboard/UserInfo';

function UserDashboard() {
    return (
        <div className="bg-black">
            <div className="p-4 md:p-10">
                <div className="flex flex-col md:flex-row gap-7">
                    <div className="w-full md:w-4/6">
                        <div className="flex flex-col gap-7">
                            <div className="">
                                <div className="flex flex-col md:flex-row gap-7">
                                    <div className="w-full">
                                        <div className="flex flex-col gap-7">
                                            <UserInfo />
                                            <Weather />
                                        </div>
                                    </div>
                                    <Notes />
                                </div>
                            </div>
                            <Timer />
                        </div>
                    </div>
                    <News />
                </div>
                <div className="flex justify-end">
                    <Link className="rounded-3xl bg-[#148A08] text-white py-1 px-4 focus:outline-none mt-6" to="/movies/browse">Browse</Link>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard