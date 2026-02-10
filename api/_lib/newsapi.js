const axios = require("axios"); //to make API request 

const BASE = "https://newsapi.org"; // root url 
const KEY = process.env.NEWS_API_KEY; // read from env 
const DEFAULT_COUNTRY = process.env.DEFAULT_COUNTRY || "us"; // default country , if not set
const DEFAULT_PAGE_SIZE = Number(process.env.DEFAULT_PAGE_SIZE || 12); // number of result per page 

if (!KEY) console.warn("[WARN] NEWS_API_KEY is not set."); // cath misconfiguration 

// this avoids repeating the same config for each call 
const http = axios.create({ // preconfigured axios instance 
  baseURL: BASE, // every request is relative to this link 
  timeout: 12000, // give up after 12 secs
  headers: { "X-Api-Key": KEY }, // attaches the API key on every request 
});

// to keep page and pagesize within server suported bounds
function clamp(n, min, max) {
  const x = Number(n);
  if (Number.isNaN(x)) return min; // if n is not a valid nunber, it returns min
  return Math.min(Math.max(x, min), max);
}

// calls GET /top headlines                                (optional)
async function getTopHeadlines({ country = DEFAULT_COUNTRY, category, page = 1, pageSize = DEFAULT_PAGE_SIZE }) {
  const params = {
    country,                                     // ex. us, ph 
    page: clamp(page, 1, 100),                   // paginated results with clamped bounds 
    pageSize: clamp(pageSize, 1, 100),           // paginated results with clamped bounds 
  };
  if (category) params.category = category;
  const { data } = await http.get("/top-headlines", { params });
  return data;                                   // { status, totalResults, articles }
}

//calls GET /everything 
async function searchEverything({ q, sortBy = "publishedAt", page = 1, pageSize = DEFAULT_PAGE_SIZE, language = "en" }) {
  const params = {
    q,                                                              //required search query string 
    sortBy,                                                         // deafult published at (could be relevancy, popularity, published at)
    language,                                                       // 2 letter code 
    page: clamp(page, 1, 100),                                      // with clamping 
    pageSize: clamp(pageSize, 1, 100),                              // with clamping 
  };
  const { data } = await http.get("/everything", { params });
  return data;                                                      // { status, totalResults, articles }
}

module.exports = { getTopHeadlines, searchEverything }; // export 