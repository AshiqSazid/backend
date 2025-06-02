import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, FileAudio, FileText, Upload } from 'lucide-react'
import React, { useState } from 'react'

export default function TextSection() {
    const [textContent, setTextContent] = useState("");
    const handleAnalyze = () => {}
    return (
        <TabsContent value="text" className="space-y-6">
            <Card className="border-2 shadow-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Text Analysis</CardTitle>
                    <CardDescription>Enter text or upload a text file to analyze its emotional content.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="input" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="input">Text Input</TabsTrigger>
                            <TabsTrigger value="file">File Upload</TabsTrigger>
                        </TabsList>
                        <TabsContent value="input" className="space-y-4">
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="text-input">Enter Text</Label>
                                    <Textarea
                                        id="text-input"
                                        placeholder="Enter your lyrics or text here..."
                                        className="min-h-[150px] transition-all duration-200 focus-visible:ring-primary/70"
                                        value={textContent}
                                        onChange={(e) => setTextContent(e.target.value)}
                                    />
                                    <Button onClick={handleAnalyze} className="mt-2 transition-all duration-200">
                                        Analyze
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="file" className="space-y-4">
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="text-file">Upload Text File</Label>
                                    <div className="border-2 border-dashed rounded-md p-8 text-center transition-all duration-200 hover:border-primary/50 hover:bg-muted/30">
                                        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                                        <div className="text-sm text-muted-foreground mb-4">
                                            Drag and drop your text file here or click to browse
                                        </div>
                                        <Button variant="outline" className="transition-all duration-200">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Select File
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </TabsContent>
    )
}
