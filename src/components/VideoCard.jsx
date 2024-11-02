import React from 'react';
import { useNavigate } from 'react-router-dom';
import TimeAgo from 'timeago-react';

export default function VideoCard({ video, isList }) {
  const navigate = useNavigate();
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const handleClick = (videoId) => {
    navigate(`/video/${videoId}`, { state: { video } });
  };
  return (
    <li className={isList ? 'flex pb-3 lg:pl-6' : ''}>
      <div
        className={`${
          isList ? 'w-60 mr-2 flex-shrink-0' : 'w-full'
        } overflow-hidden`}
      >
        <img
          className={'cursor-pointer hover:scale-105 transition'}
          src={thumbnails.medium.url}
          alt={title}
          onClick={() => handleClick(video.id)}
        />
      </div>
      <div>
        <h2
          className='cursor-pointer font-semibold text-white line-clamp-2'
          onClick={() => handleClick(video.id)}
        >
          {title}
        </h2>
        <p className='text-sm text-gray-300'>{channelTitle}</p>
        <p className='text-sm text-gray-300'>
          <TimeAgo datetime={publishedAt} />
        </p>
      </div>
    </li>
  );
}
