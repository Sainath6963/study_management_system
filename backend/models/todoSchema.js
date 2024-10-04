import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "todo tile is required"],
    minLength: [4, "title must constain at least 4 charaters"],
  },
  description: {
    type: String,
    required: [true, "todo discription is required"],
    minLength: [10, " discription must constain at least 4 charaters"],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
  },
});

export const Todo = mongoose.model("TodoSchema", todoSchema);
