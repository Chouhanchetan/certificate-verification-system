const express = require("express");
const PDFDocument = require("pdfkit");
const Certificate = require("../model/Certificate");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:certId", auth, async (req, res) => {
  const cert = await Certificate.findOne({ certId: req.params.certId });
  if (!cert) return res.status(404).send("Invalid Certificate");
  res.json(cert);
});

router.get("/download/:certId", auth, async (req, res) => {
  const cert = await Certificate.findOne({ certId: req.params.certId });
  if (!cert) return res.status(404).send("Not found");

  const doc = new PDFDocument();
  res.setHeader("Content-Disposition", `attachment; filename=${cert.certId}.pdf`);
  doc.pipe(res);

  doc.fontSize(22).text("Certificate of Completion", { align: "center" });
  doc.moveDown();
  doc.text(`Name: ${cert.name}`);
  doc.text(`Course: ${cert.course}`);
  doc.text(`Issue Date: ${cert.issueDate}`);
  doc.text(`Certificate ID: ${cert.certId}`);

  doc.end();
});

module.exports = router;
