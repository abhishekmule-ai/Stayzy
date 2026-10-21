import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'stayzy_super_secret_jwt_key_2026';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  }
  next();
}

export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please sign in to perform this action.',
    });
  }
  next();
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. This resource requires '${role}' role.`,
      });
    }
    next();
  };
}

export { JWT_SECRET };
