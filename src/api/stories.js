const BASE = "https://hacker-news.firebaseio.com/v0";

export const getStoryList = (type = "topstories") =>
  fetch(`${BASE}/${type}.json`).then(res => res.json());