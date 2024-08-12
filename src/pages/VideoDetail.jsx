import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TimeAgo from 'timeago-react';

export default function VideoDetail() {
  const { videoId } = useParams();

  const [video, setVideo] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [error, setError] = useState(null);

  const videoUrl = '/data/list_by_video_id.json';
  const relatedVideosUrl = '/data/list_by_channel.json';

  const navigate = useNavigate();

  const handleClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(videoUrl);
        const data = await res.json();
        setVideo(data.items[0]);
      } catch (error) {
        setError('Fetching video failed');
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const res = await fetch(relatedVideosUrl);
        const data = await res.json();
        setRelatedVideos(data.items);
      } catch (error) {
        setError('Fetching related videos failed');
      }
    };
    fetchRelatedVideos();
  }, [videoId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='grid lg:grid-cols-6 gap-8 my-4 max-w-6xl mx-auto'>
      <div className='w-full col-span-4 row-span-1' key={video.id}>
        <img
          src={video.snippet?.thumbnails?.maxres?.url || ''}
          alt={video.snippet?.title || 'Video thumbnail'}
        />
        <div className='mx-3'>
          <h2 className='font-semibold text-xl text-white mt-2'>
            {video.snippet?.title || 'Title not available'}
          </h2>
          <p className='text-lg text-gray-300 mt-1.5'>
            {video.snippet?.channelTitle || 'Channel not available'}
          </p>
          <p className=' text-gray-300 text-ellipsis mt-3 line-clamp-3 lg:line-clamp-6'>
            {video.snippet?.description || 'Description not available'}
          </p>
        </div>
      </div>
      <div className='col-span-2'>
        {relatedVideos.map((video) => (
          <div
            className='my-1 grid grid-cols-2 py-1 overflow-hidden'
            key={video.id}
          >
            <img
              className='py-1 cursor-pointer hover:scale-105 transition'
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              onClick={() => handleClick(video.id)}
            />
            <div className='mt-1 ml-3'>
              <h2
                className='font-semibold text-xs text-white cursor-pointer'
                onClick={() => handleClick(video.id)}
              >
                {video.snippet.title}
              </h2>
              <p className='text-xs text-gray-300'>
                {video.snippet.channelTitle}
              </p>
              <p className='text-xs text-gray-300'>
                <TimeAgo datetime={video.snippet.publishedAt} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
