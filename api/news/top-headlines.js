const { getTopHeadlines } = require("../_lib/newsapi");
const { ok, badRequest, serverError } = require("../_lib/response");

module.exports = async (req, res) => {
  try {
    const { country, category, page, pageSize } = req.query || {};
    const data = await getTopHeadlines({ country, category, page, pageSize });
    if (data.status !== "ok") return badRequest(res, data.message || "Upstream error");
    ok(res, data);
  } catch (err) {
    serverError(res, err);
  }
};