const authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `User role '${req.user.role}' is forbidden from accessing this route`
        });
      }
      next();
    };
  };
  
  module.exports = { authorize };