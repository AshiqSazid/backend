import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, FileAudio } from 'lucide-react'
import { useState } from 'react'

export default function TextAndMusic() {
        const [songUrl, setSongUrl] = useState("");
        const [textContent, setTextContent] = useState("");
        const handleAnalyze = () => {}
    return (

        <TabsContent value="both" className="space-y-6">
            <Card className="border-2 shadow-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Combined Analysis</CardTitle>
                    <CardDescription>
                        Upload both music and text to analyze their combined emotional content.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <Label htmlFor="combined-song-url">Song URL</Label>
                            <Input
                                id="combined-song-url"
                                placeholder="https://example.com/song.mp3"
                                value={songUrl}
                                onChange={(e) => setSongUrl(e.target.value)}
                                className="transition-all duration-200 focus-visible:ring-primary/70"
                            />
                            <div className="border-2 border-dashed rounded-md p-4 text-center transition-all duration-200 hover:border-primary/50 hover:bg-muted/30">
                                <Button variant="outline" className="w-full transition-all duration-200">
                                    <FileAudio className="mr-2 h-4 w-4" />
                                    Upload Music File
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="combined-text">Enter Lyrics or Text</Label>
                            <Textarea
                                id="combined-text"
                                placeholder="Enter your lyrics or text here..."
                                className="min-h-[120px] transition-all duration-200 focus-visible:ring-primary/70"
                                value={textContent}
                                onChange={(e) => setTextContent(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button onClick={handleAnalyze} className="mt-6 w-full transition-all duration-200">
                        Analyze Both
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </TabsContent>
    )
}
