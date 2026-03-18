const express = require("express")
const cors = require("cors")
const multer = require("multer")
const pdfParse = require("pdf-parse")
const fs = require("fs")

const app = express()

app.use(cors())
app.use(express.json())

const upload = multer({ dest: "uploads/" })

app.get("/", (req, res) => {
  res.send("Server running")
})

app.post("/api/resume/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const dataBuffer = fs.readFileSync(req.file.path)
    const pdfData = await pdfParse(dataBuffer)
    const text = pdfData.text.toLowerCase()

    const skillsList = [
      "javascript", "react", "node", "express",
      "mongodb", "html", "css", "java", "python"
    ]

    const foundSkills = skillsList.filter(skill => text.includes(skill))

    let score = foundSkills.length * 8

    if (text.includes("project")) score += 20
    if (text.includes("experience")) score += 20
    if (text.includes("education")) score += 10

    if (score > 100) score = 100

    const suggestions = []

    if (!text.includes("project")) {
      suggestions.push("Add Projects section")
    }

    if (!text.includes("experience")) {
      suggestions.push("Add Experience")
    }

    if (!text.includes("github")) {
      suggestions.push("Add GitHub link")
    }

    if (!text.includes("linkedin")) {
      suggestions.push("Add LinkedIn")
    }

    if (foundSkills.length < 5) {
      suggestions.push("Add more skills")
    }

    res.json({
      score,
      skills: foundSkills,
      suggestions
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})