import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

export default function SearchedVideos() {
  const { keyword } = useParams();
  const decodedKeyword = decodeURIComponent(keyword);
  const [searchedVideos, setSearchedVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/list_by_keyword.json')
      .then((res) => res.json())
      .then((data) => setSearchedVideos(data.items))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  const handleClick = (videoId) => {
    navigate(`/${videoId}`);
  };

  return (
    <>
      <p>SearchedVideo: {decodedKeyword}</p>
      <div className='card-group'>
        {searchedVideos.map((video) => (
          <div
            key={video.snippet.channelTitle}
            className='card'
            onClick={() => handleClick(video.id.videoId)}
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
    </>
  );
}
