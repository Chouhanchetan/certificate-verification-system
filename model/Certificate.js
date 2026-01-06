// models/Certificate.js
const mongoose = require("mongoose");

const certSchema = new mongoose.Schema({
  certId: String,
  name: String,
  course: String,
  issueDate: String
});

module.exports = mongoose.model("Certificate", certSchema);
