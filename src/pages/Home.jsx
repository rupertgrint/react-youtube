import React from 'react';
import { useParams } from 'react-router-dom';
import useVideos from '../hooks/use-videos';
import VideoCard from '../components/VideoCard';

export default function Home() {
  const { keyword } = useParams();
  const { isLoading, error, videos } = useVideos(keyword || '');
  console.log(videos);

  if (isLoading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div>Error: Videos not fetched</div>;
  }

  return (
    <>
      <ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-auto my-10 px-40 gap-x-2 gap-y-4'>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ul>
    </>
  );
}
