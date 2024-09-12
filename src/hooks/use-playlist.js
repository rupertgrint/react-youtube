import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function usePlaylist(channelId) {
  const { youtube } = useYoutubeApi();

  const {
    data: playlists,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['playlists', channelId],
    queryFn: () => youtube.relatedToChannel(channelId),
    staleTime: 1000 * 60 * 5,
  });

  return { playlists, isLoading, error };
}
