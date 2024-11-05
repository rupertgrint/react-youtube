import React from 'react';
import { useParams } from 'react-router-dom';
import RelatedVideos from '../components/RelatedVideos';
import MainVideo from '../components/MainVideo';

export default function VideoDetail() {
  const { videoId } = useParams();

  return (
    <section className='flex flex-col lg:flex-row px-10 mx-auto'>
      <section className='lg:basis-4/6' key={videoId}>
        <MainVideo videoId={videoId} />
      </section>
      <section className='lg:basis-2/6 '>
        <RelatedVideos />
      </section>
    </section>
  );
}
