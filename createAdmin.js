const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./model/User");

mongoose.connect(process.env.MONGO_URI);

(async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    username: "admin",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Admin created");
  process.exit();
})();
