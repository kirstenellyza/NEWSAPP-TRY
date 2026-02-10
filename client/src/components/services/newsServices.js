import api from "./apiClient";

export async function getTopHeadlines({ country = "us", category, page = 1, pageSize = 12 } = {}) {
  const { data } = await api.get("/news/top-headlines", { params: { country, category, page, pageSize } });
  return data;
}

export async function searchNews({ q, page = 1, pageSize = 12, sortBy = "publishedAt" } = {}) {
  const { data } = await api.get("/news/search", { params: { q, page, pageSize, sortBy } });
  return data;
}