export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    console.log('search', keyword);
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 25,
          q: keyword,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #mostPopular() {
    console.log('popular');
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
          regionCode: 'US',
        },
      })
      .then((res) => res.data.items);
  }

  async relatedToChannel(channelId) {
    return this.apiClient
      .playlists({
        params: { part: 'snippet', channelId, maxResults: 25 },
      })
      .then((res) => res.data.items);
  }

  async videoById(videoId) {
    return this.apiClient
      .videos({
        params: { part: 'snippet', id: videoId },
      })
      .then((res) => res.data);
  }
}
