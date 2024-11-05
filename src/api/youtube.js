export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
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

  async channelImgURL(id) {
    return this.apiClient
      .channel({ params: { part: 'snippet', id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async videoById(id) {
    return this.apiClient
      .videos({ params: { part: 'snippet', id } })
      .then((res) => res.data.items[0]);
  }
}
