const BASE = "https://hacker-news.firebaseio.com/v0";

export const getUser = (username) =>
  fetch(`${BASE}/user/${username}.json`).then(res => res.json());