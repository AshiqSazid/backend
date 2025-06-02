"use client"
import base from '@/api_request/axios'
import END_POINTS from '@/api_request/endPoints'

import { useEffect, useState } from 'react'
import EmotionAnalysis from './components/EmotionAnalysis';
import UnderstandingEmotions from './components/UnderstandingEmotions';
import EmotionTagging from './components/EmotionTagging';
import TargetAudience from './components/TargetAudience';
import PlaylistRecommendations from './components/PlaylistRecommendations';
import MusicImprovementRecommendation from './components/MusicImprovementRecommendation';
import CollaborationMatching from './components/CollaborationMatching';
import TrendAnalysis from './components/TrendAnalysis';

type FeatureSettings = {
    EmotionAnalysis: boolean;
    EmotionTagging: boolean;
    TargetAudience: boolean;
    PlaylistRecommendations: boolean;
    MusicImprovementRecommendation: boolean;
    CollaborationMatching: boolean;
    TrendAnalysis: boolean;
};
type AnalyzeResponseProps = {
    chartData: any; // Replace 'any' with the specific type if known
};

export default function AnalyzeResponse({ chartData }: AnalyzeResponseProps) {
    const [settings, setSettings] = useState<FeatureSettings>({
        EmotionAnalysis: false,
        EmotionTagging: false,
        TargetAudience: false,
        PlaylistRecommendations: false,
        MusicImprovementRecommendation: false,
        CollaborationMatching: false,
        TrendAnalysis: false
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await base.get(END_POINTS.feature_settings)
                if (response.status === 200) {
                    setSettings(response?.data);

                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, []);
    if (isLoading) {
        return (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-8">
                {
                    settings.EmotionAnalysis && <>
                        <EmotionAnalysis chartData={chartData} />
                        <UnderstandingEmotions />
                    </>
                }
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {settings.EmotionTagging && <EmotionTagging />}
                {settings.TargetAudience && <TargetAudience />}
                {settings.PlaylistRecommendations && <PlaylistRecommendations />}
                {settings.MusicImprovementRecommendation && <MusicImprovementRecommendation />}
                {settings.CollaborationMatching && <CollaborationMatching />}
                {settings.TrendAnalysis && <TrendAnalysis />}
            </div>
        </>
    )



}
