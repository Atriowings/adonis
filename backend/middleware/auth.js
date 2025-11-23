const jwt = require("jsonwebtoken");
const getUser = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const User = getUser();
    const user = await User.findByPk(payload.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token invalid", error: err.message });
  }
};
