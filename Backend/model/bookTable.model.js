import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Phone: {
      type: String,
      required: true,
      unique: true,
    },
    Persons: {
      type: String,
      default: 1,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    dinning_Time: {
      type: String,
      default: "7:00pm",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
