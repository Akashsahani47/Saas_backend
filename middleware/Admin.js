export const adminMiddleware = (req, res, next) => {
  if (!req.admin) {
    return res.status(403).json({
      message: 'Access denied. Admins only.',
      success: false
    });
  }
  next();
};
