const jwt = require("jsonwebtoken");
const form = require("../helpers/form");

module.exports = {
  checkLogin: (err, req, res, next) => {
    if (err.stack) {
      console.log(err);
    }
    const bearerToken = req.header("x-access-token");
    if (!bearerToken) {
      form.error(res, "Access Error", 403, "You need login to access it");
    } else {
      const token = bearerToken.split(" ")[1];
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.decodedToken = decodedToken;
        next();
      } catch (error) {
        form.error(res, "Error Network", 403, "Invalid Token");
      }
    }
  },
};
