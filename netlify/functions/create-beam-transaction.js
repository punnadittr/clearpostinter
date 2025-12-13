// Payment serverless function removed — payment flows are disabled.
// This placeholder prevents accidental consumption if invoked.
exports.handler = async () => ({
  statusCode: 410,
  body: JSON.stringify({ error: 'Payment services disabled' }),
});
