const express = require("express");
const xlsx = require("xlsx");
const Certificate = require("../model/Certificate");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/upload", auth, async (req, res) => {
  const workbook = xlsx.read(req.files[0].buffer);
  const sheet = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1);

  const data = sheet.map(row => ({
    certId: "CERT" + Date.now() + Math.floor(Math.random() * 100),
    name: row.Name,
    course: row.Course,
    issueDate: new Date().toDateString()
  }));

  await Certificate.insertMany(data);
  res.send("Certificates Uploaded");
});

module.exports = router;
