import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment';

function News() {
    const [news, setNews] = useState(null);

    async function fetchNews() {
        try {
            const response = await axios.get('https://api.webz.io/newsApiLite?token=bc5a4166-bfe9-4807-ab2f-773caf46398d&q=india');
            const filteredPosts = response.data.posts.filter(post => post.thread && post.thread.main_image);
            setNews(filteredPosts[Math.floor(Math.random() * filteredPosts.length)]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    // console.log(news)

    return (
        <div className="bg-white w-full md:w-2/6 rounded-2xl">
            {news ? (
                <div>
                    <div className="relative">
                        <img src={news.thread.main_image} alt="News Image" className="block w-full h-auto" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                            <p className="font-medium text-lg text-white mb-3" dangerouslySetInnerHTML={{ __html: news.highlightThreadTitle }}></p>
                            <p>{moment(news.published).format('M-DD-YYYY | hh:mm A')}</p>
                        </div>
                    </div>
                    <button className="block mx-auto text-green-500 border border-green-500 px-3 mt-3" onClick={() => fetchNews()}>Refresh News</button>
                    <div className="text-lg p-5" dangerouslySetInnerHTML={{ __html: news.highlightText }}></div>
                </div>
            ) : (
                <p className="text-center font-medium mt-10">Loading News ...</p>
            )}
        </div>
    )
}

export default News
