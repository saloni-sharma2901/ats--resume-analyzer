import { useState } from "react"
import axios from "axios"

function UploadResume() {

  const [file, setFile] = useState(null)
  const [score, setScore] = useState(null)
  const [skills, setSkills] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  const uploadResume = async () => {

    if (!file) {
      alert("Select file first")
      return
    }

    const formData = new FormData()
    formData.append("resume", file)

    try {
      setLoading(true)

      const res = await axios.post(
        "http://localhost:3000/api/resume/upload",
        formData
      )

      setScore(res.data.score)
      setSkills(res.data.skills)
      setSuggestions(res.data.suggestions)

    } catch (err) {
      console.log(err)
      alert("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "white",
      fontFamily: "sans-serif"
    }}>

      <div style={{
        background: "#111827",
        padding: "30px",
        borderRadius: "15px",
        width: "350px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        textAlign: "center"
      }}>

        <h1 style={{ marginBottom: "20px" }}>
           🚀 ATS Resume Analyzer
        </h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            marginBottom: "15px",
            color: "white"
          }}
        />

        <button
          onClick={uploadResume}
          style={{
            width: "100%",
            padding: "10px",
            background: "#22c55e",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {/* RESULT */}
        {score !== null && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>

            {/* Score */}
            <h2 style={{ marginBottom: "10px" }}>
              Score: {score}
            </h2>

            {/* Progress bar */}
            <div style={{
              height: "8px",
              background: "#374151",
              borderRadius: "5px",
              overflow: "hidden",
              marginBottom: "15px"
            }}>
              <div style={{
                width: `${score}%`,
                height: "100%",
                background: "#22c55e"
              }}></div>
            </div>

            {/* Skills */}
            <h3>Skills:</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  background: "#1f2937",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  fontSize: "12px"
                }}>
                  {s}
                </span>
              ))}
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <>
                <h3 style={{ marginTop: "15px" }}>Suggestions:</h3>
                <ul style={{ paddingLeft: "18px" }}>
                  {suggestions.map((s, i) => (
                    <li key={i} style={{ marginBottom: "5px" }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  )
}

export default UploadResume