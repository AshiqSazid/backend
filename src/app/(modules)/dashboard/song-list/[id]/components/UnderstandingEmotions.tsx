"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function UnderstandingEmotions() {
    const [mounted, setMounted] = useState(false)

    // Once mounted, we can show the theme toggle
    useEffect(() => {
        setMounted(true)
    }, [])

    // Mock data for the emotion analysis
    const emotionData: { emotion: keyof typeof emotionDescriptions; score: number; percentage: string; fill: string }[] = [
        { emotion: "Uplifting", score: 85, percentage: "85%", fill: "hsl(var(--chart-1))" },
        { emotion: "Distracting", score: 45, percentage: "45%", fill: "hsl(var(--chart-2))" },
        { emotion: "Reassuring", score: 60, percentage: "60%", fill: "hsl(var(--chart-3))" },
        { emotion: "Motivating", score: 75, percentage: "75%", fill: "hsl(var(--chart-4))" },
        { emotion: "Relaxing", score: 55, percentage: "55%", fill: "hsl(var(--chart-5))" },
        { emotion: "Suppressing", score: 30, percentage: "30%", fill: "hsl(var(--chart-6))" },
        { emotion: "Destressing", score: 65, percentage: "65%", fill: "hsl(var(--chart-7))" },
    ]

    // Emotion descriptions
    const emotionDescriptions = {
        Uplifting: "Creates feelings of joy, hope, and optimism. Elevates mood and energy levels.",
        Distracting: "Pulls attention away from focus. Can be either stimulating or disruptive.",
        Reassuring: "Provides comfort and security. Creates a sense of calm and safety.",
        Motivating: "Inspires action and determination. Energizes and drives forward momentum.",
        Relaxing: "Reduces tension and stress. Promotes a sense of peace and tranquility.",
        Suppressing: "Dampens emotional response. May create distance or detachment.",
        Destressing: "Reduces stress and anxiety. Promotes relaxation and mental clarity.",
    }

    // Find the dominant emotion
    const dominantEmotion = emotionData.reduce((prev, current) => (prev.score > current.score ? prev : current))



    return (
        <Card className="border-2 shadow-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Understanding Emotions</CardTitle>
                <CardDescription>
                    Learn what each emotion means and how it impacts the listener's experience
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {emotionData.map((emotion) => (
                        <div
                            key={emotion.emotion}
                            className="p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:border-primary/50"
                            style={{ borderLeft: `4px solid ${emotion.fill}` }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: emotion.fill }}></div>
                                <h3 className="font-medium">{emotion.emotion}</h3>
                                {emotion.emotion === dominantEmotion.emotion && (
                                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">Dominant</span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">{emotionDescriptions[emotion.emotion]}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
