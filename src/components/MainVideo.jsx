import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import ChannelInfo from './ChannelInfo';

export default function MainVideo({ videoId }) {
  const { youtube } = useYoutubeApi();
  const {
    data: video,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => youtube.videoById(videoId),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <div>Loading video...</div>;
  }

  if (error || !video) {
    return <div>Error: Video not found</div>;
  }

  const { title, channelId, channelTitle, description } = video.snippet;

  return (
    <>
      <iframe
        id='player'
        type='text/html'
        width='100%'
        height='640'
        style={{ border: 'none' }}
        title={title}
        src={`http://www.youtube.com/embed/${video.id}`}
      />
      <div className='mx-3'>
        <h2 className='font-semibold text-xl text-white mt-2'>{title}</h2>
        <ChannelInfo id={channelId} name={channelTitle} />
        <p className=' text-gray-300 text-ellipsis mt-3 line-clamp-3 lg:line-clamp-6'>
          {description}
        </p>
      </div>
    </>
  );
}