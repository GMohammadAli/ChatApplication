import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { successResponse, errorResponse} from "../utils/responseRouter.js"
import jwt from "jsonwebtoken"

const secretKey = process.env.SECRET_KEY;

export const loginUser = async (req, res) => {
  // login could be done by either username or email, but compulsory password
  const reqBody = req.body;
  if (reqBody.name === undefined && reqBody.email === undefined) {
    return errorResponse(
      res,
      400,
      "Please provide either an email address or name of the user!!!",
      "Bad Request"
    );
  }

  //search user if not present return not registered user
  const userSearched = await User.findOne(
    reqBody.name ? { name: reqBody.name } : { email: reqBody.email }
  );
  //console.log(userSearched)
  if (!userSearched) {
    //not equal to null
    return errorResponse(
      res,
      401,
      "UserName/Email provided does not exists!!!",
      "Unauthorized"
    );
  } else {
    //if present create token and send it to frontend
    //send token
    const passwordMatch = await bcrypt.compare(
      reqBody.password,
      userSearched.password
    );
    if (!passwordMatch) {
      return errorResponse(
        res,
        401,
        "Incorrect Password",
        "Authentication failed"
      );
    }

    const userSearchParam = reqBody.name
      ? reqBody.name 
      : reqBody.email;
    //signing token with respect to that user or email
    const token = jwt.sign({ userSearchParam }, secretKey, {
      expiresIn: "24h",
    });

     return successResponse(
      res,
      200,
      "User Login was successfull",
      "Logged In",
      token
    );
  }
}

export const registerUser = async (req, res) => {
  //search if already existing user
  const reqBody = req.body
  //console.log(reqBody);
  const userSearch = await User.findOne(
    reqBody.email ? { email: reqBody.email } : { name: reqBody.name } 
  );
  //console.log(userSearch)
  if (userSearch){//if null then user does not exists
    //if true then give appropriate response
    return errorResponse(
      res,
      400,
      "UserName/ Email Already in use!!!",
      "Bad Request"
    );
  }else if(!reqBody.password){
    return errorResponse(
      res,
      400,
      "Please provide password for this",
      "Bad Request"
    );
  }else{
    //if not create a user using hashed password
    try {
      const hashedPassword = await bcrypt.hash(reqBody.password, 10);
      const user = new User({
        name: reqBody.name,
        email: reqBody.email,
        password: hashedPassword,
      });

      await user.save();

      return successResponse(
        res,
        201,
        "User has been Successfully Created!!!",
        "Created"
      );

    } catch (err) {
      return errorResponse(res, 400, err, "Bad Request");
    }
  }
};

export const logoutUser = async (req, res) => {
   return successResponse(
     res,
     200,
     "Just Delete the Token Muzaffar!!",
     "Logged Out"
   );
};

export const getUsers = async (req, res) => {
  const users = await User.find({})
   return successResponse(
    res,
    200,
    "Here's the list of all the Users, Yayyy, Successfull Authentication",
    "Fetched Users",
    users
  );
}