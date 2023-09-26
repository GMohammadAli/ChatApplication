const User = require("../models/User")
const bcrypt = require('bcryptjs')

module.exports.loginUser = async (req, res) => {
  // login could be done by either username or email, but compulsory password
  const reqBody = req.body;
  if (reqBody.name === undefined && reqBody.email === undefined) {
    res.status(400).json({
      error: "Bad Request",
      message: "Please provide either an email address or name of the user!!!",
    });
  }

  //search user if not present return not registered user
  const userSearch = await User.findOne(
    reqBody.name !== undefined
      ? { name: reqBody.name }
      : { email: reqBody.email }
  ); //rectify this properly
  console.log(userSearch)
  if (!userSearch)
    //not equal to null
    res.status(401).json({
      error: "Unauthorized",
      message: "UserName/Email provided does not exists!!!",
    });
  //if present create token and send it to frontend
  //send token
  res.status(200).send("User Login Function Accessed!");
}

module.exports.registerUser = async (req, res) => {
  //search if already existing user
  const reqBody = req.body
  //console.log(reqBody);
  const userSearch = await User.findOne(
    reqBody.email ? { email: reqBody.email } : { name: reqBody.name } //rectify this properly
  );
  //console.log(userSearch)
  if (userSearch){//if null then user does not exists
    //if true then give appropriate response
    res.status(400).json({
      error: "Bad Request",
      message: "UserName/ Email Already in use!!!",
    });
  }else {
    //if not create a user using hashed
    try {
      const hashedPassword = await bcrypt.hash(reqBody.password, 10);
      const user = new User({
        name: reqBody.name,
        email: reqBody.email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({
            error: "Created",
            message: "User has been Successfully Created!!!",
        });

    } catch (err) {
      res.status(400).json({
        error: "Bad Request",
        message: err,
      });
    }
  }
};

module.exports.logoutUser = async (req, res) => {
    res.send("User Logout Function Accessed!");
};



//Status Codes and their respective meanings
//400 Bad Request
//401 Unauthorized
//403 Forbidden
//200 OK
// 201 Created

//response structure to be followed
// res.status(400).json({
//   error: "Bad Request",
//   message: "Please provide either an email address or name of the user!!!",
// });