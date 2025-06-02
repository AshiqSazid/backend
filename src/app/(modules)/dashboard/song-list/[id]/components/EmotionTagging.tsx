"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"



export default function EmotionTagging() {
    const [songUrl, setSongUrl] = useState("")
    const [textContent, setTextContent] = useState("")
    const [isAnalyzed, setIsAnalyzed] = useState(false)
    const [analysisType, setAnalysisType] = useState("music")
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Once mounted, we can show the theme toggle
    useEffect(() => {
        setMounted(true)
    }, [])

    // Mock data for the emotion analysis
    const emotionData = [
        { emotion: "Uplifting", score: 85, percentage: "85%", fill: "hsl(var(--chart-1))" },
        { emotion: "Distracting", score: 45, percentage: "45%", fill: "hsl(var(--chart-2))" },
        { emotion: "Reassuring", score: 60, percentage: "60%", fill: "hsl(var(--chart-3))" },
        { emotion: "Motivating", score: 75, percentage: "75%", fill: "hsl(var(--chart-4))" },
        { emotion: "Relaxing", score: 55, percentage: "55%", fill: "hsl(var(--chart-5))" },
        { emotion: "Suppressing", score: 30, percentage: "30%", fill: "hsl(var(--chart-6))" },
    ]

    // Emotion descriptions
    const emotionDescriptions = {
        Uplifting: "Creates feelings of joy, hope, and optimism. Elevates mood and energy levels.",
        Distracting: "Pulls attention away from focus. Can be either stimulating or disruptive.",
        Reassuring: "Provides comfort and security. Creates a sense of calm and safety.",
        Motivating: "Inspires action and determination. Energizes and drives forward momentum.",
        Relaxing: "Reduces tension and stress. Promotes a sense of peace and tranquility.",
        Suppressing: "Dampens emotional response. May create distance or detachment.",
    }

    // Find the dominant emotion
    const dominantEmotion = emotionData.reduce((prev, current) => (prev.score > current.score ? prev : current))

    const handleAnalyze = () => {
        if (
            (analysisType === "music" && songUrl.trim() !== "") ||
            (analysisType === "text" && textContent.trim() !== "") ||
            (analysisType === "both" && songUrl.trim() !== "" && textContent.trim() !== "")
        ) {
            setIsAnalyzed(true)
        }
    }

  return (
    <Card className="border-2 shadow-sm transition-all duration-200 hover:shadow-md">
    <CardHeader className="text-center">
        <CardTitle className="text-xl">Emotion Tagging & Genre</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="space-y-4">
            <div>
                <h4 className="text-sm font-medium mb-2 text-center">Primary Emotions</h4>
                <div className="flex flex-wrap justify-center gap-2">
                    <div className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {dominantEmotion.emotion}
                    </div>
                    <div className="bg-muted px-2.5 py-0.5 rounded-full text-xs font-medium">Energetic</div>
                    <div className="bg-muted px-2.5 py-0.5 rounded-full text-xs font-medium">Positive</div>
                </div>
            </div>
            <Separator />
            <div>
                <h4 className="text-sm font-medium mb-2 text-center">Genre Classification</h4>
                <div className="space-y-2">
                    {dominantEmotion.emotion === "Uplifting" ? (
                        <>
                            <div>
                                <p className="text-sm font-medium text-center">Main Genres:</p>
                                <p className="text-sm text-muted-foreground text-center">
                                    Pop, Electronic Dance, Indie Pop
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-center">Sub-Genres:</p>
                                <p className="text-sm text-muted-foreground text-center">
                                    Synth-Pop, Electro-Folk, Tropical House
                                </p>
                            </div>
                        </>
                    ) : dominantEmotion.emotion === "Motivating" ? (
                        <>
                            <div>
                                <p className="text-sm font-medium text-center">Main Genres:</p>
                                <p className="text-sm text-muted-foreground text-center">Rock, Hip-Hop, Electronic</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-center">Sub-Genres:</p>
                                <p className="text-sm text-muted-foreground text-center">
                                    Alternative Rock, Trap, Drum & Bass
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <p className="text-sm font-medium text-center">Main Genres:</p>
                                <p className="text-sm text-muted-foreground text-center">Ambient, Classical, Folk</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-center">Sub-Genres:</p>
                                <p className="text-sm text-muted-foreground text-center">
                                    Neo-Classical, Acoustic, Ambient Electronic
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </CardContent>
</Card>
  )
}
