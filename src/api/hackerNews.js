const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export async function fetchList(type = "topstories") {
  const res = await fetch(`${BASE_URL}/${type}.json`);
  return res.json();
}

export async function fetchItem(id) {
  const res = await fetch(`${BASE_URL}/item/${id}.json`);
  return res.json();
}