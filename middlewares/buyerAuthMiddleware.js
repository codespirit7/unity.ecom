require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const jwt = require("jsonwebtoken");

const User = require("../model/User");

const buyerAuthMiddleware = async (req, res, next) => {
  const authBearer = req.headers["authorization"].split(" ");
  const token = authBearer[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user information to the request object for further processing
    console.log(decoded);

    const user = await User.findOne({ email: decoded.email });
    if (user) {
      if (user.userType !== "buyer") {
        return res.status(401).json({ message: "userType not authorized" });
      }
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Call the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { buyerAuthMiddleware };
