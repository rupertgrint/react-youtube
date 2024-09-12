import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import TimeAgo from 'timeago-react';
import usePlaylist from '../hooks/use-playlist';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function VideoDetail() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [channelId, setChannelId] = useState(null);
  const { youtube } = useYoutubeApi();

  const {
    data: videos,
    isLoading: videoLoading,
    error: videoError,
  } = useQuery({
    queryKey: ['videos', videoId],
    queryFn: () => youtube.videoById(videoId),
    staleTime: 1000 * 60 * 5,
  });

  const video = videos?.items[0];

  useEffect(() => {
    setChannelId(video?.snippet?.channelId);
  }, [video, videoId]);

  console.log('video', video);
  console.log('video Id', videoId);
  console.log('channelId', channelId);

  const {
    playlists,
    isLoading: playlistLoading,
    error: playlistError,
  } = usePlaylist(channelId);

  if (videoLoading || playlistLoading) return <div>Loading videos...</div>;
  if (videoError || playlistError || !video)
    return <div>Error: Video data not available</div>;

  const { title, channelTitle, description } = video.snippet;

  const handleClick = (playlistId) => {
    navigate(`/video/${playlistId}`);
    console.log('playlist.id', playlistId);
  };

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
          <h2 className='font-semibold text-xl text-white mt-2'>
            {title || 'Title not available'}
          </h2>
          <p className='text-lg text-gray-300 mt-1.5'>
            {channelTitle || 'Channel not available'}
          </p>
          <p className=' text-gray-300 text-ellipsis mt-3 line-clamp-3 lg:line-clamp-6'>
            {description || 'Description not available'}
          </p>
        </div>
      </section>
      <section className='col-span-2'>
        {playlists.map((playlist) => (
          <div
            className='my-1 grid grid-cols-2 gap-3 py-1 overflow-hidden'
            key={playlist.id}
          >
            <div className='overflow-hidden'>
              <img
                className='py-1 cursor-pointer hover:scale-105 transition'
                src={playlist.snippet.thumbnails.medium.url}
                alt={playlist.snippet.title}
                onClick={() => handleClick(playlist.id)}
              />
            </div>
            <div className='mt-1'>
              <h2
                className='font-semibold text-xs text-white cursor-pointer'
                onClick={() => handleClick(playlist.id)}
              >
                {playlist.snippet.title}
              </h2>
              <p className='text-xs text-gray-300'>
                {playlist.snippet.channelTitle}
              </p>
              <p className='text-xs text-gray-300'>
                <TimeAgo datetime={playlist.snippet.publishedAt} />
              </p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
