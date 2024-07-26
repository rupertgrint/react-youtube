import { getVideoByKeyword } from '../lib/video';
import { useQuery } from '@tanstack/react-query';

export default function useVideos(keyword) {
  const {
    data: videos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => getVideoByKeyword(keyword),
    staleTime: 1000 * 60 * 5,
  });

  return { videos, isLoading, error };
}
