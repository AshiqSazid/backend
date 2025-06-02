import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function Processing() {
    return (
        <Card className="border-2 shadow-sm transition-all duration-200 hover:shadow-md">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Your Analysis is processing</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    We are analyzing your song and will notify you once the analysis is complete. Please check back later for the results.  Thank you for your patience!
                </p>
                <Link  href="/dashboard/song-list" className="text-sm text-blue-500  hover:underline">Check the Song List to see the progress</Link>
            </CardContent>
        </Card>
    )
}
