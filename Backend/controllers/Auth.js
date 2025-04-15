import Users from "../models/Usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupuser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const ifusernameexists = await Users.findOne({ username });
    if (ifusernameexists) {
      return res.status(400).json({
        error: "Username already in use",
      });
    }
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const user = await Users.create({
      username,
      password: hashedpassword,
    });
    console.log(user);
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_PASSWORD
      );
      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("cuvette_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
      });
      res.status(200).json({
        success: true,
        token: token,
        message: "User signup succeeded",
        user: user,
      });
    }
  } catch (error) {
    res.status(403).json({
      error: error.message,
      success: false,
      message: "User signup failed",
    });
  }
};

export const signinuser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No such user exists.Create an account first",
      });
    }
    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect credentials",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_PASSWORD
    );

    const isProduction = process.env.NODE_ENV === "production";
    console.log(`isProduction:${isProduction}`);

    res.cookie("cuvette_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    });

    return res.status(200).json({
      success: true,
      token: token,
      message: "User signin succeeded",
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutuser = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("cuvette_token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
    });
    res.status(200).json({ success: true, message: "User logged out" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while logging out ",
      error: error.message,
    });
  }
};

export const checkToken = async (req, res) => {
  const req_token = req.cookies?.cuvette_token;
  console.log(req_token);
  try {
    if (!req_token) {
      res.status(400).json({ message: "Please login" });
      return;
    }

    const payload = jwt.verify(req_token, process.env.JWT_PASSWORD);
    if (!payload?.id) {
      res.status(400).json({ message: "Token not valid" });
      return;
    }

    const user = await Users?.findById({ _id: payload.id });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User authenticated",
      user: { username: user.username },
    });
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(400).json({ message: "Invalid token", token: req_token });
    return;
  }
};
