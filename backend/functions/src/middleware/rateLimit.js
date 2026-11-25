const requestCounts = new Map();

export function rateLimit({ windowMs = 60000, max = 100 } = {}) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();

    const record = requestCounts.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count += 1;
    }

    requestCounts.set(ip, record);

    if (record.count > max) {
      return res.status(429).json({
        error: 'Muitas requisições enviadas. Limite de taxa excedido, tente novamente em 1 minuto.'
      });
    }

    next();
  };
}
