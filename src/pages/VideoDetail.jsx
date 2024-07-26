import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

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
    <div className='grid grid-cols-5  grid-rows-3 gap-8 my-10 px-16'>
      <div className='col-span-4 row-span-1' key={video.id}>
        <img
          src={video.snippet?.thumbnails?.maxres?.url || ''}
          alt={video.snippet?.title || 'Video thumbnail'}
        />
        <h2 className='font-semibold text-[20px] text-white'>
          {video.snippet?.title || 'Title not available'}
        </h2>
        <p className='text-[18px] text-gray-300'>
          {video.snippet?.channelTitle || 'Channel not available'}
        </p>
        <p className='h-[40px] text-[16px] text-gray-300 text-ellipsis'>
          {video.snippet?.description || 'Description not available'}
        </p>
      </div>
      <div className=''>
        {relatedVideos.map((video) => (
          <div className='py-1 overflow-hidden' key={video.id}>
            <img
              className='py-1 cursor-pointer hover:scale-105 transition'
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              onClick={() => handleClick(video.id)}
            />
            <h2
              className='font-semibold text-[14px] text-white cursor-pointer'
              onClick={() => handleClick(video.id)}
            >
              {video.snippet.title}
            </h2>
            <p className='text-[13px] text-gray-300'>
              {video.snippet.channelTitle}
            </p>
            <p className='text-[13px] text-gray-300'>
              <ReactTimeAgo date={video.snippet.publishedAt} locale='en-US' />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
