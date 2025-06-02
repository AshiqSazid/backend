"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Github, Instagram, Twitter } from "lucide-react"
export default function CollaborationMatching() {
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
                <CardTitle className="text-xl">Collaboration Matching</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-center">Recommended Bangladeshi Collaborators</h4>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-muted"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Tahsan Khan</p>
                                <p className="text-xs text-muted-foreground">Lyricist • {dominantEmotion.emotion} specialist</p>
                            </div>
                            <div className="flex gap-1">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 transition-all duration-200 hover:bg-primary/10"
                                            >
                                                <Instagram className="h-4 w-4" />
                                                <span className="sr-only">Instagram</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>@tahsan_official</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 transition-all duration-200 hover:bg-primary/10"
                                            >
                                                <Twitter className="h-4 w-4" />
                                                <span className="sr-only">Twitter</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>@tahsankhan</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-muted"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Habib Wahid</p>
                                <p className="text-xs text-muted-foreground">
                                    Producer • 120+ {dominantEmotion.emotion} tracks
                                </p>
                            </div>
                            <div className="flex gap-1">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 transition-all duration-200 hover:bg-primary/10"
                                            >
                                                <Instagram className="h-4 w-4" />
                                                <span className="sr-only">Instagram</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>@habibwahid</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 transition-all duration-200 hover:bg-primary/10"
                                            >
                                                <Github className="h-4 w-4" />
                                                <span className="sr-only">Github</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>github.com/habibwahid</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-muted"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Elita Karim</p>
                                <p className="text-xs text-muted-foreground">Vocalist • Perfect for your style</p>
                            </div>
                            <div className="flex gap-1">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 transition-all duration-200 hover:bg-primary/10"
                                            >
                                                <Instagram className="h-4 w-4" />
                                                <span className="sr-only">Instagram</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>@elitakarim</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 transition-all duration-200 hover:bg-primary/10"
                                            >
                                                <Twitter className="h-4 w-4" />
                                                <span className="sr-only">Twitter</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>@elita_karim</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" size="sm" className="w-full transition-all duration-200 hover:bg-primary/10">
                    Connect with Collaborators
                </Button>
            </CardFooter>
        </Card>
    )
}
