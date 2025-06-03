"use client"

import { useState } from "react"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function InstrumentAnalysisPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [proportions, setProportions] = useState<Record<string, number> | null>(null)
  const [jsonUrl, setJsonUrl] = useState("")
  const [csvUrl, setCsvUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!audioFile) return
    const formData = new FormData()
    formData.append("file", audioFile)

    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData
      })

      const data = await res.json()
      setProportions(data.proportions)
      setJsonUrl(data.json_url)
      setCsvUrl(data.csv_url)
    } catch (err) {
      alert("Failed to analyze audio.")
    }

    setLoading(false)
  }

  const chartData = proportions
    ? {
        labels: Object.keys(proportions),
        datasets: [
          {
            data: Object.values(proportions),
            backgroundColor: ["#2b83ba", "#fdae61", "#66c2a5", "#d53e4f"]
          }
        ]
      }
    : null

  return (
    <Card className="border-2 shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Instrument Proportions Analyzer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
        />
        <Button onClick={handleUpload} disabled={loading || !audioFile}>
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
        {proportions && chartData && (
          <>
            <Separator />
            <h4 className="text-sm text-center font-medium">🎼 Instrument Proportions</h4>
            <div className="max-w-xs mx-auto">
              <Pie data={chartData} />
            </div>
            <div className="text-center space-x-4 mt-4">
              <a href={jsonUrl} download className="text-blue-500 underline">
                Download JSON
              </a>
              <a href={csvUrl} download className="text-blue-500 underline">
                Download CSV
              </a>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
