const BASE = "https://hacker-news.firebaseio.com/v0";

export const getItem = (id) =>
  fetch(`${BASE}/item/${id}.json`).then(res => res.json());