import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateTokenAndSetCookie,
  storeRefreshToken,
} from "../Lib/generateToken.js";

export const Signup = async (req, res) => {
  try {
    const { Name, Phone, Email, Password, role, confirmPassword } = req.body;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingEmail = await User.findOne({ Email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    if (
      (Password === true && confirmPassword === undefined) ||
      (Password === undefined && confirmPassword === true)
    ) {
      return res
        .status(400)
        .json({ error: "Password and Confirm Password are required" });
    }

    if (Password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    //hash password
    console.log("Password:", Password);
    const salt = await bcrypt.genSalt(10);
    console.log("Salt:", salt);
    const hashpassword = await bcrypt.hash(Password, salt);
    console.log("Hashed Password:", hashpassword);

    const newUser = new User({
      Name,
      Phone,
      Email,
      role,
      Password: hashpassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await storeRefreshToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        Name: newUser.Name,
        Phone: newUser.Phone,
        Email: newUser.Email,
        role: newUser.role,
        Favourite: newUser.Favorite,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in signupController", error);
  }
};

export const Login = async (req, res) => {
  try {
    const { Name, Password } = req.body;

    const user = await User.findOne({ Name });

    const ispasswordCorrect = await bcrypt.compare(
      Password,
      user?.Password || ""
    );

    if (!user || !ispasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or Password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      Name: user.Name,
      Phone: user.Phone,
      Email: user.Email,
    });
  } catch (error) {
    console.log("error in the Login controller", error.message);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("error in the Logout controller", error.message);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
