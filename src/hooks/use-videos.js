import { useParams } from 'react-router-dom';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function useVideos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    data: videos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => youtube.search(keyword),
    staleTime: 1000 * 60 * 5,
  });

  return { videos, isLoading, error };
}
