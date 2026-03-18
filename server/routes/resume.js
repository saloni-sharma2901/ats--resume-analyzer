const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const fs = require("fs");
const pdfParse = require("pdf-parse");

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "File nahi mili" });
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    if (!pdfData || !pdfData.text) {
      return res.json({
        message: "PDF read ho gaya but text extract nahi hua"
      });
    }

    const text = pdfData.text.toLowerCase();

    const skillsList = [
      "javascript",
      "react",
      "node",
      "mongodb",
      "html",
      "css",
      "python",
      "java",
      "sql",
      "git"
    ];

    const foundSkills = skillsList.filter(skill => text.includes(skill));

    const score = foundSkills.length * 10;
    const message = score > 60 ? "Good Resume 👍" : "Needs Improvement ⚠️"

const suggestions = [
  "Add more projects",
  "Improve formatting",
  "Add achievements",
  "Use better keywords"
]

res.json({
  score,
  skills: foundSkills,
  message,
  suggestions
})

  

}catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;