export async function getVideoByKeyword(keyword) {
  const url =
    keyword === '' ? 'data/most_popular.json' : '/data/list_by_keyword.json';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
  } catch (error) {
    throw new Error('Error fetching videos');
  }
}
