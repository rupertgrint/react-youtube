import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const handleClick = (e, videoId) => {
    e.preventDefault();
    navigate(`/video/${videoId}`);
  };

  useEffect(() => {
    fetch('data/most_popular.json')
      .then((res) => res.json())
      .then((data) => setVideos(data.items))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className='card-group'>
      {videos.map((video) => (
        <div
          key={video.id}
          className='card'
          onClick={(e) => handleClick(e, video.id)}
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          <h2>{video.snippet.title}</h2>
          <p>{video.snippet.channelTitle}</p>
          <p>
            <ReactTimeAgo date={video.snippet.publishedAt} locale='en-US' />
          </p>
        </div>
      ))}
    </div>
  );
}
