import React from 'react';
import { useLocation } from 'react-router-dom';
import RelatedVideos from '../components/RelatedVideos';
import ChannelInfo from '../components/ChannelInfo';

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;

  return (
    <section className='grid lg:grid-cols-6 gap-8 my-4 max-w-6xl mx-auto'>
      <section className='w-full col-span-4 row-span-1' key={video.id}>
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
      </section>
      <section className='col-span-2'>
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
}
