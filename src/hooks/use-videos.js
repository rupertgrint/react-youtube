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
  });

  return { videos, isLoading, error };
}
