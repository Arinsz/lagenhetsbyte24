require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/User");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email }); // Kolla om användaren redan finns
    if (userExists) {
      return res.status(400).json({
        message: "Denna e-postadress är redan registrerad. Försök med en annan."
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const user = new User({ email, password, verificationToken });
    await user.save();

    const verificationLink = `http://localhost:5000/api/users/verify/${verificationToken}`;
    console.log("Verification Link:", verificationLink);

    const mailOptions = {
      from: `"Lägenhetsbyte24" <${process.env.EMAIL_USER}>`, // Set a different "from" name
      to: user.email,
      subject: "Verify your email",
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
      html: `<p>Please verify your email by clicking the following link:</p>
             <p><a href="${verificationLink}" target="_blank" style="color: blue; text-decoration: underline;">Click here to verify your email</a></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Error sending verification email" });
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for verification.",
      success: true
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Registreringen misslyckades", error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect to home page with success query parameter
    const redirectUrl = "http://localhost:3000/?verified=true";
    console.log("Redirecting to:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error verifying email:", error);
    res
      .status(500)
      .json({ message: "Verification failed", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = { registerUser, verifyUser, loginUser };
