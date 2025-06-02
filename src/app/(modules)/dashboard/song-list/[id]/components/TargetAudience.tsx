"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"




export default function TargetAudience() {
    const [songUrl, setSongUrl] = useState("")
    const [textContent, setTextContent] = useState("")
    const [isAnalyzed, setIsAnalyzed] = useState(false)
    const [analysisType, setAnalysisType] = useState("music")
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
                <CardTitle className="text-xl">Target Audience</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium mb-3 text-center">Age Groups</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-sm min-w-[50px]">18-24</span>
                                <div className="h-3 flex-1 bg-muted rounded-full overflow-hidden">
                                    <div className="bg-primary h-full transition-all duration-500" style={{ width: "80%" }}></div>
                                </div>
                                <span className="text-sm font-medium">80%</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm min-w-[50px]">25-34</span>
                                <div className="h-3 flex-1 bg-muted rounded-full overflow-hidden">
                                    <div className="bg-primary h-full transition-all duration-500" style={{ width: "65%" }}></div>
                                </div>
                                <span className="text-sm font-medium">65%</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm min-w-[50px]">35-44</span>
                                <div className="h-3 flex-1 bg-muted rounded-full overflow-hidden">
                                    <div className="bg-primary h-full transition-all duration-500" style={{ width: "40%" }}></div>
                                </div>
                                <span className="text-sm font-medium">40%</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm min-w-[50px]">45+</span>
                                <div className="h-3 flex-1 bg-muted rounded-full overflow-hidden">
                                    <div className="bg-primary h-full transition-all duration-500" style={{ width: "25%" }}></div>
                                </div>
                                <span className="text-sm font-medium">25%</span>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <h4 className="text-sm font-medium mb-2 text-center">Top Cities in Bangladesh</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="text-sm">Dhaka</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="text-sm">Chittagong</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="text-sm">Sylhet</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="text-sm">Rajshahi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="text-sm">Khulna</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="text-sm">Barisal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
