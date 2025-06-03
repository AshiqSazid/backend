"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function ViralityPage() {
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [audioFiles, setAudioFiles] = useState<FileList | null>(null)
  const [metrics, setMetrics] = useState<any>(null)
  const [predictions, setPredictions] = useState<any[]>([])
  const [queryText, setQueryText] = useState("")
  const [ragResults, setRagResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleTrain = async () => {
    if (!csvFile || !audioFiles) return
    const formData = new FormData()
    formData.append("csv", csvFile)
    Array.from(audioFiles).forEach((file) => formData.append("audio", file))

    setLoading(true)
    const res = await fetch("http://localhost:5000/train", { method: "POST", body: formData })
    const data = await res.json()
    setMetrics(data.metrics)
    setPredictions(data.predictions_sample)
    setLoading(false)
  }

  const handleQuery = async () => {
    if (!queryText.trim()) return
    const res = await fetch("http://localhost:5000/rag_query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: queryText })
    })
    const data = await res.json()
    setRagResults(data.results)
  }

  return (
    <Card className="border-2 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-center">🎧 Virality Predictor + RAG Explorer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files?.[0] || null)} />
          <Input type="file" multiple accept="audio/*" onChange={(e) => setAudioFiles(e.target.files)} />
          <Button onClick={handleTrain} disabled={loading}>
            {loading ? "Training..." : "Train & Predict"}
          </Button>
        </div>

        {metrics && (
          <>
            <Separator />
            <h4 className="text-sm font-medium">📊 Evaluation Metrics</h4>
            <ul className="text-sm list-disc pl-5">
              <li>MAE: {metrics.MAE}</li>
              <li>RMSE: {metrics.RMSE}</li>
              <li>R²: {metrics.R2}</li>
            </ul>
          </>
        )}

        {predictions.length > 0 && (
          <>
            <Separator />
            <h4 className="text-sm font-medium">🔮 Sample Predictions</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {predictions.slice(0, 5).map((pred, i) => (
                <div key={i} className="p-2 border rounded">
                  <strong>Actual:</strong> {pred.actual} — <strong>Predicted:</strong> {pred.predicted.toFixed(1)}
                </div>
              ))}
            </div>
          </>
        )}

        <Separator />
        <h4 className="text-sm font-medium">🔍 RAG Search</h4>
        <Textarea
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="e.g. Songs with high tempo and strong artist popularity"
        />
        <Button onClick={handleQuery} className="mt-2">
          Search
        </Button>

        {ragResults.length > 0 && (
          <div className="space-y-3 mt-4">
            <h4 className="text-sm font-medium">🧠 Retrieved Tracks</h4>
            {ragResults.map((r, i) => (
              <div key={i} className="border p-3 rounded bg-muted">
                <p className="text-sm">{r["Track Summary"]}</p>
                <p className="text-xs text-gray-600">
                  Score: {r["Popularity Score"]} — {r["Verdict"]}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
