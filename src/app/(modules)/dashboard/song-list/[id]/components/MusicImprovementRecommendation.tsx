"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
export default function MusicImprovementRecommendation() {
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
                <CardTitle className="text-xl">Music Improvement Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {dominantEmotion.emotion === "Uplifting" ? (
                        <>
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Music Adjustments</h4>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                                    <li>Add more dynamic range to create emotional peaks and valleys</li>
                                    <li>Increase brightness in the mix with higher frequency elements</li>
                                    <li>Consider adding vocal harmonies in the chorus sections</li>
                                    <li>Experiment with major 7th and 9th chords for more emotional depth</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Lyric Improvements</h4>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                                    <li>Emphasize themes of growth, overcoming challenges, and personal victories</li>
                                    <li>Use more vivid imagery and sensory details in verses</li>
                                    <li>Create a stronger hook with memorable, repeatable phrases</li>
                                    <li>Consider adding a bridge with contrasting emotional tone</li>
                                </ul>
                            </div>
                        </>
                    ) : dominantEmotion.emotion === "Motivating" ? (
                        <>
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Music Adjustments</h4>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                                    <li>Increase the tempo slightly to 110-120 BPM for optimal energy</li>
                                    <li>Add more pronounced percussion elements with stronger transients</li>
                                    <li>Consider a build-up section before the chorus for greater impact</li>
                                    <li>Use power chords and strong bass lines to enhance drive</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Lyric Improvements</h4>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                                    <li>Focus on determination, perseverance, and achievement narratives</li>
                                    <li>Use more action verbs and direct, imperative statements</li>
                                    <li>Create a call-and-response section for audience engagement</li>
                                    <li>Incorporate culturally relevant references to connect with Bangladeshi listeners</li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Music Adjustments</h4>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                                    <li>Add more ambient elements and reduce rhythmic complexity</li>
                                    <li>Incorporate natural sound samples (rain, waves, etc.) for texture</li>
                                    <li>Use sustained notes and gentle transitions between sections</li>
                                    <li>Consider reducing percussion elements or using softer sounds</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Lyric Improvements</h4>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                                    <li>Explore themes of mindfulness, nature, and inner peace</li>
                                    <li>Use more descriptive language with fewer words overall</li>
                                    <li>Consider incorporating Bengali poetry traditions</li>
                                    <li>Create space between lyrics to let the music breathe</li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" size="sm" className="w-full transition-all duration-200 hover:bg-primary/10">
                    Get Detailed Feedback
                </Button>
            </CardFooter>
        </Card>
    )
}
