import mongoose from "mongoose";

export const dbconnection = () => {
  mongoose
    .connect(
      "mongodb+srv://sainathbalkawade7:eHVFCKOyDj8U5xqO@cluster0.5xhsf.mongodb.net/?retryWrites=true",
      {
        dbName: "TODO_APPLICATION",
      }
    )
    .then(() => {
      console.log("Connected to database successfully!");
    })
    .catch((error) => {
      console.log(`Some error occured while connecting to database: ${error}`);
    });
};
