import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn`t exist" });
    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.REACT_APP_USER_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Sorry, something went wrong." });
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "The user already exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "The passwords don't match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.REACT_APP_USER_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: result, token });
  } catch (error) {
    console.log("paso 1 error: ", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
