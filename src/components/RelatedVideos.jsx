import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

export default function RelatedVideos({ videoId }) {
  const { youtube } = useYoutubeApi();
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['videos'],
    queryFn: () => youtube.search(),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      {isLoading && <div>Videos are loading...</div>}
      {error && <div>Error: Error fetching videos!</div>}
      {videos && (
        <ul className='my-1 grid grid-cols-1 gap-3 py-1 overflow-hidden'>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} isList={true} />
          ))}
        </ul>
      )}
    </>
  );
}
