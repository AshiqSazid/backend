"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import AnalyzeResponse from "../song-list/[id]/AnalyzeResponse"
import MusicSection from "./MusicSection"
import TextAndMusic from "./TextAndMusic"
import TextSection from "./TextSection"
import Processing from "./Processing"

export default function MusicEmotionDashboard() {
    const [isProcessing, setIsProcessing] = useState(false);

    // Mock data for the emotion analysis
    return (
        <div className="container mx-auto py-6 space-y-8">
            <header className="flex flex-col space-y-6">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-2xl font-bold tracking-tight">Emotion Analysis Dashboard</h1>
                    </div>
                </div>
                <Tabs
                    defaultValue="music"
                    className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="music">Music</TabsTrigger>
                        <TabsTrigger value="text">Text</TabsTrigger>
                        <TabsTrigger value="both">Music & Text</TabsTrigger>
                    </TabsList>
                    <MusicSection
                        setIsProcessing={setIsProcessing}
                        isProcessing={isProcessing}
                    />
                    <TextSection />
                    <TextAndMusic />

                </Tabs>
            </header>
            {isProcessing && <Processing />}
        </div>
    )
}

