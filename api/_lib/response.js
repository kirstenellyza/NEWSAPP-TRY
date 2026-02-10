function ok(res, payload) {
  res.status(200).json({ ok: true, ...payload });
}
function badRequest(res, message = "Bad Request") {
  res.status(400).json({ ok: false, error: message });
}
function serverError(res, err) {
  console.error(err?.response?.data || err);
  const msg = err?.response?.data?.message || "Internal Server Error";
  res.status(500).json({ ok: false, error: msg });
}
module.exports = { ok, badRequest, serverError };