const User = require("../models/User");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email }); // Kolla om användaren redan finns
    if (userExists) {
      return res
        .status(400)
        .json({
          message:
            "Denna e-postadress är redan registrerad. Försök med en annan."
        });
    }

    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Registreringen misslyckades", error: error.message });
  }
};

module.exports = { registerUser };
