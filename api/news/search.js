const { searchEverything } = require("../_lib/newsapi");
const { ok, badRequest, serverError } = require("../_lib/response");

module.exports = async (req, res) => {
  try {
    const { q, sortBy, page, pageSize } = req.query || {};
    if (!q || !q.trim()) return badRequest(res, "Missing query parameter 'q'");
    const data = await searchEverything({ q, sortBy, page, pageSize });
    if (data.status !== "ok") return badRequest(res, data.message || "Upstream error");
    ok(res, data);
  } catch (err) {
    serverError(res, err);
  }
};