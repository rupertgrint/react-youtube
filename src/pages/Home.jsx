import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import useVideos from '../hooks/use-videos';

export default function Home() {
  const { keyword } = useParams();
  const { isLoading, error, videos } = useVideos(keyword || '');

  const navigate = useNavigate();

  const handleClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  if (isLoading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div>Error: Videos not fetched</div>;
  }

  return (
    <>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-auto my-10 px-40 gap-x-2 gap-y-4'>
        {videos.map((video) => (
          <div className='overflow-hidden' key={video.id}>
            <img
              className='cursor-pointer hover:scale-105 transition'
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              onClick={() => handleClick(video.id)}
            />
            <h2
              className='cursor-pointer font-semibold text-base text-white'
              onClick={() => handleClick(video.id)}
            >
              {video.snippet.title}
            </h2>
            <p className='text-sm text-gray-300'>
              {video.snippet.channelTitle}
            </p>
            <p className='text-sm text-gray-300'>
              <TimeAgo datetime={video.snippet.publishedAt} />
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
