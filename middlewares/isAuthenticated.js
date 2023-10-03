const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/responseRouter');
const secretKey = process.env.SECRET_KEY;

//verify json token
module.exports.isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      errorResponse(res, 401,"Please Provide Token for Authorization" ,"Unauthorized") 
    }

    jwt.verify(token, secretKey , (err, user) => {
      if (err) {
        errorResponse(
          res,
          403,
          "Invalid Token",
          "Forbidden"
        ); 
      }
      req.user = user;
      next();
    });
}

const isAuthorOfChat = async (req, res, next) => {};