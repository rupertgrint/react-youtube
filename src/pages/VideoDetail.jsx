import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
// import useVideos from '../hooks/useVideos';

export default function VideoDetail() {
  const { videoId } = useParams();
  const [mainVideo, setMainVideo] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const mainVideoUrl = '/data/list_by_video_id.json';
  const relatedVideosUrl = '/data/list_by_channel.json';

  // const {
  //   loading: videoLoading,
  //   error: videoError,
  //   videos: mainVideo,
  // } = useVideos(mainVideoUrl);
  // const {
  //   loading: realatedVideosLoading,
  //   error: relatedVideosError,
  //   videos: relatedVideos,
  // } = useVideos(relatedVideosUrl);

  const navigate = useNavigate();

  const handleClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  useEffect(() => {
    fetch(mainVideoUrl)
      .then((res) => res.json())
      .then((data) => {
        setMainVideo(data.items[0]);
      })
      .catch((error) => console.error('Error fetching video:', error));
  }, [videoId]);

  useEffect(() => {
    fetch(relatedVideosUrl)
      .then((res) => res.json())
      .then((data) => {
        setRelatedVideos(data.items);
      })
      .catch((error) => console.error('Error fetching related videos:', error));
  }, [videoId]);

  // if (loading) {
  //   return <div>Loading videos...</div>;
  // }

  return (
    <div className='grid grid-cols-5  grid-rows-3 gap-8 my-10 px-16'>
      <div className='col-span-4 row-span-1' key={mainVideo.id}>
        <img
          src={mainVideo.snippet?.thumbnails?.maxres?.url || ''}
          alt={mainVideo.snippet?.title || 'Video thumbnail'}
        />
        <h2 className='font-semibold text-[20px] text-white'>
          {mainVideo.snippet?.title || 'Title not available'}
        </h2>
        <p className='text-[18px] text-gray-300'>
          {mainVideo.snippet?.channelTitle || 'Channel not available'}
        </p>
        <p className='h-[40px] text-[16px] text-gray-300 text-ellipsis'>
          {mainVideo.snippet?.description || 'Description not available'}
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
