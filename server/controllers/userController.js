require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt"); // Lägg till bcrypt för lösenordshashning
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

    const hashedPassword = await bcrypt.hash(password, 10); // Hasha lösenordet
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const user = new User({
      email,
      password: hashedPassword,
      verificationToken
    });
    await user.save();

    const verificationLink = `http://localhost:5000/api/users/verify/${verificationToken}`;
    console.log("Verifieringslänk:", verificationLink);

    const mailOptions = {
      from: `"Lägenhetsbyte24" <${process.env.EMAIL_USER}>`, // Ange ett annat "från"-namn
      to: user.email,
      subject: "Verifiera din e-post",
      text: `Vänligen verifiera din e-post genom att klicka på följande länk: ${verificationLink}`,
      html: `<p>Vänligen verifiera din e-post genom att klicka på följande länk:</p>
             <p><a href="${verificationLink}" target="_blank" style="color: blue; text-decoration: underline;">Klicka här för att verifiera din e-post</a></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Fel vid skickande av e-post:", error);
        return res
          .status(500)
          .json({ message: "Fel vid skickande av verifierings-e-post" });
      } else {
        console.log("E-post skickad:", info.response);
      }
    });

    res.status(201).json({
      message:
        "Användare registrerad framgångsrikt. Vänligen kontrollera din e-post för verifiering.",
      success: true
    });
  } catch (error) {
    console.error("Fel vid registrering av användare:", error);
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
      return res.status(400).json({ message: "Ogiltig eller utgången token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    // Omdirigera till startsidan med verifierad query-parameter
    const redirectUrl = "http://localhost:3000?verified=true";
    console.log("Omdirigerar till:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Fel vid verifiering av e-post:", error);
    res
      .status(500)
      .json({ message: "Verifieringen misslyckades", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Ogiltig e-post eller lösenord" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Jämför hashat lösenord
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Ogiltig e-post eller lösenord" });
    }

    if (!user.verified) {
      return res.status(400).json({
        message: "Vänligen verifiera din e-post först",
        unverified: true
      });
    }

    res.status(200).json({ message: "Inloggning lyckades", user });
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    res
      .status(500)
      .json({ message: "Inloggningen misslyckades", error: error.message });
  }
};

const logoutUser = (req, res) => {
  // Implementera eventuell server-sida utloggningslogik här, såsom att rensa sessioner eller tokens
  res.status(200).json({ message: "Utloggning lyckades" });
};

module.exports = { registerUser, verifyUser, loginUser, logoutUser };
