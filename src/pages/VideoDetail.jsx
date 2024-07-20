import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

export default function VideoDetail() {
  const { videoId } = useParams();
  const [video, setVideo] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetch('/data/list_by_video_id.json')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.items);
        setVideo(data.items[0]);
      })
      .catch((error) => console.error('Error fetching video:', error));
  });

  useEffect(() => {
    fetch('/data/list_by_channel.json')
      .then((res) => res.json())
      .then((data) => {
        setRelatedVideos(data.items);
        console.log(data.items);
      })
      .catch((error) => console.error('Error fetching related videos:', error));
  }, [videoId]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div key={video.id}>
        <img
          src={video.snippet?.thumbnails?.maxres?.url || ''}
          alt={video.snippet?.title || 'Video thumbnail'}
        />
        <h2>{video.snippet?.title || 'Title not available'}</h2>
        <p>{video.snippet?.channelTitle || 'Channel title not available'}</p>
        <p>{video.snippet?.description || 'Description not available'}</p>
      </div>
      <div className='related-videos-group'>
        {relatedVideos.map((video) => (
          <div
            key={video.snippet.channelTitle}
            className='card'
            // onClick={() => handleClick(video.id.videoId)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <h2>{video.snippet.title}</h2>
            <p>{video.snippet.channelTitle}</p>
            <p>
              <ReactTimeAgo date={video.snippet.publishedAt} locale='en-US' />
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
