import { Todo } from "../models/todoSchema.js";

export const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  const createdBy = req.user._id;
  if (!title || !description) {
    return next(
      res.status(400).json({
        success: false,
        message: "please provide both title  and description",
      })
    );
  }
  const task = await Todo.create({ title, description, createdBy });
  res.status(200).json({
    success: true,
    message: "task created",
    task,
  });
};

export const getMyTasks = async (req, res, next) => {
  const tasks = await Todo.find({ createdBy: req.user._id });
  res.status(200).json({
    success: true,
    tasks,
  });
};

export const deleteTask = async (req, res, next) => {
  const task = await Todo.findById(req.params.id);
  if (!task) {
    return next(
      res.status(404).json({
        success: false,
        message: "task not found",
      })
    );
  }
  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "task deleted!",
  });
};

export const updateTask = async (req, res, next) => {
  let task = await Todo.findById(req.params.id);
  if (!task) {
    return next(
      res.status(404).json({
        success: false,
        message: "Task not found",
      })
    );
  }
  const { title, description } = req.body;
  task = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, description },
    {
      new: true,
      runValidatiors: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Task Updated",
  });
};
