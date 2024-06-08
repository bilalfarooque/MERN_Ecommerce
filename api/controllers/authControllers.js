import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.json({
        status: false,
        message: "Missing fields",
      });

    // encrypting user password
    // generating salt
    const salt = await bcrypt.genSaltSync(10);

    // hashing password
    const hashPassword = await bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//login
export const loginController = async (req, res, next) => {
  try {
    // Check for missing fields
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        status: false,
        message: "Missing Fields",
      });
    }

    const user = await User.findOne({ username: req.body.username });
    console.log("====>>> user data", user);

    if (!user) {
      return res.status(404).json("No User Found");
    } else {
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        return res.status(401).json("Wrong Password");
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        return res
          .cookie("access_token", accessToken, {
            httpOnly: true,
          })
          .status(200)
          .json({ ...otherDetails, isAdmin });
      }
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({
      status: false,
      message: "Server Error",
      error: error.message
    });
  }
};
