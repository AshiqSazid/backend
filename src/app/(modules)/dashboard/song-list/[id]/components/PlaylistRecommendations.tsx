"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAudio, Link } from "lucide-react"

export default function PlaylistRecommendations() {
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
                <CardTitle className="text-xl">Playlist Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        {dominantEmotion.emotion === "Uplifting" ? (
                            <>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                                        <FileAudio className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Feel Good Indie</p>
                                        <p className="text-xs text-muted-foreground">Spotify • 2.3M followers</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                                        <FileAudio className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Morning Motivation</p>
                                        <p className="text-xs text-muted-foreground">Apple Music • 1.8M followers</p>
                                    </div>
                                </div>
                            </>
                        ) : dominantEmotion.emotion === "Motivating" ? (
                            <>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                                        <FileAudio className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Workout Essentials</p>
                                        <p className="text-xs text-muted-foreground">Spotify • 5.1M followers</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                                        <FileAudio className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Power Hour</p>
                                        <p className="text-xs text-muted-foreground">Apple Music • 3.2M followers</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                                        <FileAudio className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Peaceful Piano</p>
                                        <p className="text-xs text-muted-foreground">Spotify • 7.8M followers</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                                        <FileAudio className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Deep Focus</p>
                                        <p className="text-xs text-muted-foreground">Apple Music • 4.5M followers</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="ghost" size="sm" className="w-full transition-all duration-200 hover:bg-primary/10">
                    <Link className="h-4 w-4 mr-2" />
                    View All Recommendations
                </Button>
            </CardFooter>
        </Card>
    )
}
