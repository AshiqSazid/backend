"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function MistralGeneratePage() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()
      setResponse(data.response)
    } catch (err) {
      setResponse("❌ Failed to connect to Mistral backend.")
    }

    setLoading(false)
  }

  return (
    <Card className="border-2 shadow-lg max-w-2xl mx-auto mt-10">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">🎶 Mistral Music Strategist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Suggest viral marketing tactics for an upbeat pop track"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </Button>
        <Textarea readOnly value={response} className="min-h-[200px]" />
      </CardContent>
    </Card>
  )
}
