import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, FileAudio, Upload } from 'lucide-react'
import React, { useState } from 'react'
import FileUpload from './FileUpload'

export default function MusicSection({ setIsProcessing,isProcessing }: { setIsProcessing: (isProcessing: boolean) => void , isProcessing: boolean }) {
    const [songUrl, setSongUrl] = useState("");
    const handleAnalyze = () => {}
    return (
        <TabsContent value="music" className="space-y-6">
            <Card className="border-2 shadow-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Song Upload</CardTitle>
                    <CardDescription>
                        Upload your song file or paste a URL to analyze its emotional content.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="url" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="url">URL</TabsTrigger>
                            <TabsTrigger value="file">File Upload</TabsTrigger>
                        </TabsList>
                        <TabsContent value="url" className="space-y-4">
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="song-url">Song URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="song-url"
                                            placeholder="https://example.com/song.mp3"
                                            value={songUrl}
                                            onChange={(e) => setSongUrl(e.target.value)}
                                            className="transition-all duration-200 focus-visible:ring-primary/70"
                                        />
                                        <Button onClick={handleAnalyze} className="transition-all duration-200">
                                            Analyze
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <FileUpload
                         setIsProcessing={setIsProcessing}
                         isProcessing={isProcessing}
                        />
                    </Tabs>
                </CardContent>
            </Card>
        </TabsContent>
    )
}
