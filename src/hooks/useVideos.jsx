import React, { useState, useEffect } from 'react';

export default function useVideos(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [url]);

  return { loading, error, videos };
}
