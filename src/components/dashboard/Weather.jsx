import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';

function Weather() {
    const [getLocation, setLocation] = useState([]);
    const location = "Cuttack, Odisha, India";

    async function getWeather() {
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: location,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: '0'
            },
            headers: {
                'X-RapidAPI-Key': '1559d32918msh582cadeb292b64fp1f0e8ajsn4e82e1148d86',
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setLocation(response.data.locations[location].currentConditions);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getWeather()
    }, []);

    // console.log(getLocation)

    return (
        <div className="bg-[#101744] text-white rounded-2xl">
            <div className="bg-[#FF4ADE] text-center rounded-t-2xl py-2 px-4">
                <span className="text-2xl font-medium me-5">{moment(getLocation.datetime).format('D-M-YYYY')}</span>
                <span className="text-2xl font-medium">{moment(getLocation.datetime).format('hh:mm A')}</span>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-center gap-3">
                    <div className="">
                        <img src="/images/icons/rain.png" alt="" />
                        <p>Heavy Rain</p>
                    </div>
                    <div className="border-2 border-gray-400 h-12"></div>
                    <div className="">
                        <h1 className="text-5xl text-center mb-3">{getLocation.temp}°C</h1>
                        <div className="flex items-center">
                            <div className="mr-2">
                                <img src="/images/icons/temperature.png" alt="" />
                            </div>
                            <div>
                                <p>{getLocation.sealevelpressure} mbar</p>
                                <p>Pressure</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-2 border-gray-400 h-12"></div>
                    <div className="bg">
                        <div className="flex items-center">
                            <div className="mr-2">
                                <img width={20} src="/images/icons/wind.png" alt="" />
                            </div>
                            <div>
                                <p>{getLocation.wspd} Km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center">
                            <div className="mr-2">
                                <img width={20} src="/images/icons/humidity.png" alt="" />
                            </div>
                            <div>
                                <p>{getLocation.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
