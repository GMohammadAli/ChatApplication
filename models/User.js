const mongoose = require("mongoose")

const genderEnum = {
    "Male" : "M",
    "Female" : "F"
}

const userModelStructure = {
  avatar: {
    type: Object,
    required: false,
  },
  name: {
    type: String,
    required: [true, "Username Can't be empty!"],
  },
  email: {
    type: String,
    required: [true, "User Email Can't be empty!"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    //for male-female logo
    type: String,
    enum: Object.values(genderEnum),
    default: genderEnum["Male"]
  },
};

const userSchema = new mongoose.Schema(userModelStructure);

module.exports = mongoose.model("User", userSchema)