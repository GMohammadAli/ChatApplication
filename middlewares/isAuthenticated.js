import jwt from "jsonwebtoken"
import { errorResponse } from "../utils/responseRouter.js"
const secretKey = process.env.SECRET_KEY;

//verify json token
export const isAuthenticated = async (req, res, next) => {
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

export const isAuthorOfChat = async (req, res, next) => {};