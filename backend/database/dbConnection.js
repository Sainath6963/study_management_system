import mongoose from "mongoose";
const URI = "mongodb://localhost:27017/Backend_Progress";

export const dbconnection = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      UseUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected succesfully");
    })
    .catch((error) => {
      console.log("database connection error", error);
    });
};
