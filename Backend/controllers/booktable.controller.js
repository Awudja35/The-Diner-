import Book from "../model/bookTable.model.js";
import User from "../model/user.model.js";

export const bookTable = async (req, res) => {
  try {
    const { Name, Email, Phone, persons, Date, dinning_Time } = req.body;
    const user = await User._id;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const newTable = new Book({
      Name,
      Email,
      Phone,
      persons,
      Date,
      dinning_Time,
    });

    await newTable.save();

    res.status(200).json({
      Name: newTable.Name,
      Email: newTable.Email,
      Phone: newTable.Phone,
      Persons: newTable.Persons,
      Date: newTable.Date,
      dinning_Time: newTable.dinning_Time,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in booktableController", error);
  }
};

export const getBookedTables = async (req, res) => {
  try {
    const tables = await Book.find({}); // find all products
    res.json({ tables });
  } catch (error) {
    console.log("Error in bookTable controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
