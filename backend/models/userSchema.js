import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "name must constain 3 characters"],
    maxLength: [32, "name must exceed 32 character"],
  },
  email: String,
  phone: Number,

  password: {
    type: String,
    minLength: [8, "password length should be atlest 8 charaters"],
  },
});

export const User = mongoose.model("User", userSchema);
