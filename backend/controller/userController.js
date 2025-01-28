import { User } from "../modals/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {

    // extracting data from the body of request send by client
    const { fullName, email, password } = req.body;
    // checking if all fileds are provide or not
    if (!fullName || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // finding user with user email id
    const user = await User.findOne({ email });

    // checking if user already exist
    if (user) {
      return res.status(403).json({
        success: false,
        message: "user Already registered",
      });
    }
    // if not
    // hashing password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    // saving new user to db
    const newuser = await User.create({
      fullName,
      email,
      password: hashPassword,
    });
    // token generation
    const token = await jwt.sign(
      { user_id: newuser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1D" }
    );
    //sending response with seeting token in cookie of the browser
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "user registered successfully ",
      });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const isPWMatched = await bcrypt.compare(password, user.password);
    if (!isPWMatched) {
      return res.status(401).json({
        success: false,
        message: "password incorrect",
      });
    }

    const token = await jwt.sign(
      { user_id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1D" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Login successful",
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", " ", {
        maxAge: 0,
      })
      .json({
        success: true,
        message: "user logout successfully",
      });
  } catch (error) {
    console.log(error);
  }
};
