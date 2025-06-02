"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
export default function TrendAnalysis() {
    const emotionData = [
        { emotion: "Uplifting", score: 85, percentage: "85%", fill: "hsl(var(--chart-1))" },
        { emotion: "Distracting", score: 45, percentage: "45%", fill: "hsl(var(--chart-2))" },
        { emotion: "Reassuring", score: 60, percentage: "60%", fill: "hsl(var(--chart-3))" },
        { emotion: "Motivating", score: 75, percentage: "75%", fill: "hsl(var(--chart-4))" },
        { emotion: "Relaxing", score: 55, percentage: "55%", fill: "hsl(var(--chart-5))" },
        { emotion: "Suppressing", score: 30, percentage: "30%", fill: "hsl(var(--chart-6))" },
    ]
    const dominantEmotion = emotionData.reduce((prev, current) => (prev.score > current.score ? prev : current))

    return (
        <Card className="border-2 shadow-sm transition-all duration-200 hover:shadow-md">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-center">Emotion Trends (2025)</h4>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>Uplifting</span>
                                <span className="text-primary">+12% YoY</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="bg-primary h-full transition-all duration-500" style={{ width: "75%" }}></div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>Motivating</span>
                                <span className="text-primary">+8% YoY</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="bg-primary h-full transition-all duration-500" style={{ width: "65%" }}></div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>Relaxing</span>
                                <span className="text-muted-foreground">-3% YoY</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="bg-primary h-full transition-all duration-500" style={{ width: "45%" }}></div>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-center">Song Relevance Analysis</h4>
                        <div
                            className={`p-3 rounded-md ${dominantEmotion.score > 70 ? "bg-green-100 dark:bg-green-900/20" : "bg-amber-100 dark:bg-amber-900/20"}`}
                        >
                            <p className="text-sm font-medium mb-1 text-center">
                                {dominantEmotion.score > 70 ? "Trending & Relevant" : "Potentially Outdated"}
                            </p>
                            <p className="text-xs">
                                {dominantEmotion.score > 70
                                    ? `Your ${dominantEmotion.emotion.toLowerCase()} song aligns with current trends in Bangladesh. This style is gaining popularity in 2025.`
                                    : `Your song's style shows signs of being outdated compared to current trends. Consider the recommended improvements to modernize it.`}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Market Fit Score</span>
                            <span className="text-sm font-medium">{dominantEmotion.score > 70 ? "85%" : "62%"}</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-500 ${dominantEmotion.score > 70 ? "bg-green-500" : "bg-amber-500"}`}
                                style={{ width: dominantEmotion.score > 70 ? "85%" : "62%" }}
                            ></div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" size="sm" className="w-full transition-all duration-200 hover:bg-primary/10">
                    View Detailed Trend Report
                </Button>
            </CardFooter>
        </Card>
    )
}
