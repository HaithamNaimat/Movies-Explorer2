export function logPostRequest(req, res, next) {
  if (req.method === 'POST') {
    const originalJson = res.json.bind(res);
    res.json = function(body) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const user = req.session.userId || 'unauthenticated';
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] POST ${req.originalUrl} | User: ${user}`);
      }
      return originalJson(body);
    };
  }
  next();
}
