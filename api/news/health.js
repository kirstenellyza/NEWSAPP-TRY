const { getTopHeadlines } = require("../_lib/newsapi");
const { ok, serverError } = require("../_lib/response");

module.exports = async (req, res) => {
  try {
    const { country, page, pageSize } = req.query || {};
    const data = await getTopHeadlines({ country, category: "health", page, pageSize });
    ok(res, data);
  } catch (err) {
    serverError(res, err);
  }
};