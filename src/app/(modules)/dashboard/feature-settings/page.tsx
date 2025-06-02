"use client"
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import base from '@/api_request/axios';
import END_POINTS from '@/api_request/endPoints';
import { toast } from 'react-toastify';

type FeatureSettings = {
    EmotionAnalysis: boolean;
    EmotionTagging: boolean;
    TargetAudience: boolean;
    PlaylistRecommendations: boolean;
    MusicImprovementRecommendation: boolean;
    CollaborationMatching: boolean;
    TrendAnalysis: boolean;
};

export default function FeatureSettingsPanel() {
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

    // Fetch current settings
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

    // Update individual setting
    const handleToggle = async (feature: keyof FeatureSettings, value: boolean) => {
        const newSettings = { ...settings, [feature]: value };
        setSettings(newSettings);
        try {
            const res = await base.put(END_POINTS.feature_settings, {
                settings: newSettings
            })
            if (res.status === 200) {
                toast.success('Settings updated successfully!');
            }
        } catch (error) {
            console.error('Failed to update settings:', error);
            // Revert on error
            setSettings(prev => ({ ...prev, [feature]: !value }));
        }
    };

    if (isLoading) {
        return <div className="p-4">Loading settings...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Feature Settings
            </h1>

            <div className="space-y-4">
                {Object.entries(settings).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                        <Label
                            htmlFor={key}
                            className="text-gray-700 dark:text-gray-300 font-medium capitalize"
                        >
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <Switch
                            id={key}
                            checked={value as boolean}
                            onCheckedChange={(checked) => handleToggle(key as keyof FeatureSettings, checked)}
                            className={`
                  w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full relative 
                  data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-600 
                  outline-none cursor-default transition-colors duration-200
                `}
                        >
                        </Switch>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                <p>Changes are saved automatically. Some features may require a refresh to take effect.</p>
            </div>
        </div>
    );
}