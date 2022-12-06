const User = require("../app/models/user");

function authenticate(...roles) {
  return async (req, res, next) => {
    try {
      const token = await req.headers.token;
      if (!token) {
        throw new Error("Bạn không có quyền truy nhập");
      }
      const payLoad = await User.payLoadToken(token);
      req.user = payLoad;
      if (!roles.length) {
        return next();
      }
      const role = payLoad.role;
      if (!roles.includes(role)) {
        throw new Error("Bạn không có quyền truy nhập");
      }
      return next();
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };
}

module.exports = { authenticate };
