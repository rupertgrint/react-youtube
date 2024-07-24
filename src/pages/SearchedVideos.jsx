import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { useSearch } from '../context/SearchContext';

export default function SearchedVideos() {
  // const { keyword } = useParams();
  // const decodedKeyword = decodeURIComponent(keyword);
  const [searchedVideos, setSearchedVideos] = useState([]);
  const { setSearchInput } = useSearch();

  const navigate = useNavigate();

  const handleClick = (videoId) => {
    navigate(`/video/${videoId}`);
    setSearchInput('');
  };

  useEffect(() => {
    fetch('/data/list_by_keyword.json')
      .then((res) => res.json())
      .then((data) => setSearchedVideos(data.items))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  return (
    <>
      <div className='grid grid-cols-5 grid-rows-auto my-10 px-12 gap-3'>
        {searchedVideos.map((video) => (
          <div className='overflow-hidden' key={video.id}>
            <img
              className='cursor-pointer hover:scale-105 transition'
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              onClick={() => handleClick(video.id)}
            />
            <h2
              className='cursor-pointer font-semibold text-[15px] text-white'
              onClick={() => handleClick(video.id)}
            >
              {video.snippet.title}
            </h2>
            <p className='text-[14px] text-gray-300'>
              {video.snippet.channelTitle}
            </p>
            <p className='text-[14px] text-gray-300'>
              <ReactTimeAgo date={video.snippet.publishedAt} locale='en-US' />
            </p>
          </div>
        ))}
      </div>
    </>
  );
}