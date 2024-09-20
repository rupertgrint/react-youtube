import React from 'react';
import { useParams } from 'react-router-dom';
import RelatedVideos from '../components/RelatedVideos';
import MainVideo from '../components/MainVideo';

export default function VideoDetail() {
  const { videoId } = useParams();

  return (
    <section className='grid lg:grid-cols-6 gap-8 my-4 max-w-6xl mx-auto'>
      <section className='w-full col-span-4 row-span-1' key={videoId}>
        <MainVideo videoId={videoId} />
      </section>
      <section className='col-span-2'>
        <RelatedVideos />
      </section>
    </section>
  );
}
