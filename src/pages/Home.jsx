import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import useVideos from '../hooks/useVideos';

export default function Home() {
  const { loading, error, videos } = useVideos('data/most_popular.json');

  const navigate = useNavigate();

  const handleClick = (e, videoId) => {
    e.preventDefault();
    navigate(`/video/${videoId}`);
  };

  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div>Error: Videos not fetched</div>;
  }

  return (
    <div className='grid grid-cols-5 grid-rows-auto my-10 px-12 gap-3 '>
      {videos.map((video) => (
        <div
          key={video.id}
          className='w'
          onClick={(e) => handleClick(e, video.id)}
        >
          <img
            className='py-1 cursor-pointer hover:scale-105 transition'
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          <h2 className='font-semibold text-[14px] text-white cursor-pointer'>
            {video.snippet.title}
          </h2>
          <p className='text-[13px] text-gray-300'>
            {video.snippet.channelTitle}
          </p>
          <p className='text-[13px] text-gray-300'>
            <ReactTimeAgo date={video.snippet.publishedAt} locale='en-US' />
          </p>
        </div>
      ))}
    </div>
  );
}
