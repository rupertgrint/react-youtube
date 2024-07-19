import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

export default function SearchedVideos() {
  const { keyword } = useParams();
  const decodedKeyword = decodeURIComponent(keyword);
  const [searchedVideos, setSearchedVideos] = useState([]);

  useEffect(() => {
    fetch('/videos/search.json')
      .then((res) => res.json())
      .then((data) => setSearchedVideos(data.items))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  return (
    <>
      <p>SearchedVideo: {decodedKeyword}</p>
      <div className='card-group'>
        {searchedVideos.map((video) => (
          <div key={video.id} className='card'>
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
