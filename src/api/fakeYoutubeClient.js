import axios from 'axios';

export default class FakeYoutubeClient {
  async search() {
    return axios.get('/data/list_by_keyword.json');
  }

  async videos() {
    return axios.get('/data/most_popular.json');
  }
}