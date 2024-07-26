export async function getVideos(keyword) {
  return keyword ? getVideosByKeyword(keyword) : getPopularVideos();
}

async function getPopularVideos() {
  return fetch('/data/most_popular.json')
    .then((res) => res.json())
    .then((data) => data.items)
    .catch(console.error);
}

async function getVideosByKeyword(keyword) {
  return await fetch('/data/list_by_keyword.json')
    .then((res) => res.json())
    .then((data) =>
      data.items.map((item) => ({ ...item, id: item.id.videoId }))
    )
    .catch(console.error);
}
