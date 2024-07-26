import { useState, useEffect } from 'react';

export default function useVideos(keyword) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const url =
          keyword === ''
            ? 'data/most_popular.json'
            : '/data/list_by_keyword.json';
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
  }, [keyword]);

  return { loading, error, videos };
}
