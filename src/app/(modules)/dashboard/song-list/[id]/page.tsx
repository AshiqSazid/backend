"use client"
import { use, useEffect, useState } from 'react';
import base from '@/api_request/axios';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import AnalyzeResponse from './AnalyzeResponse';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Emotion descriptions
const EMOTION_DESCRIPTIONS = {
  Uplifting: "Inspires positive emotions, hope, or elevates mood",
  Distracting: "Diverts attention from negative thoughts or provides mental escape",
  Reappraisal: "Helps reinterpret situations in a more positive/constructive way",
  Motivating: "Energizes listeners and drives them toward action or goals",
  Relaxing: "Calms the listener and reduces stress or anxiety",
  Suppressing: "Helps suppress or control negative emotions",
  Destressing: "Reduces stress or anxiety, promoting relaxation and calmness",
};

const defaultChartData = {
  labels: Object.keys(EMOTION_DESCRIPTIONS),
  datasets: [
    {
      label: 'Analysis Score',
      data: [0.3, 0.4, 0.5, 0.2, 0.5, 0.3, 0.4],
      borderRadius: 5,
      backgroundColor: [
        "rgba(255,99,132,0.7)",
        "rgba(54,162,235,0.7)",
        "rgba(255,206,86,0.7)",
        "rgba(75,192,192,0.7)",
        "rgba(152,102,255,0.7)",
        "rgba(255,159,64,0.7)",
        "rgba(255,99,132,0.7)",
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54,162,235,1)",
        "rgba(255,206,86,1)",
        "rgba(75,192,192,1)",
        "rgba(152,102,255,1)",
        "rgba(255,159,64,1)",
        "rgba(255,99,132,1)",
      ],
      borderWidth: 1,
    },
  ],
};


export default function SongAnalysisChart({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [chartData, setChartData] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [songTitle, setSongTitle] = useState('');

  useEffect(() => {
    if (!id) {
      setError('No song ID provided');
      setIsLoading(false);



      return;
    }

    const fetchSongAnalysis = async () => {
      try {
        setIsLoading(true);
        const response = await base.get(`/music/analyse/${id}`);
        if (response.data) {
          const analysisRes = await base.get(`/analysis/${response?.data?.request_id}`);
          const updatedChartData = {
            ...defaultChartData,
            datasets: [
              {
                ...defaultChartData.datasets[0],
                data: [
                  analysisRes.data.uplifting || 0,
                  analysisRes.data.distracting || 0,
                  analysisRes.data.reappraisal || 0,
                  analysisRes.data.motivating || 0,
                  analysisRes.data.relaxing || 0,
                  analysisRes.data.suppressing || 0,
                  analysisRes.data?.destressing || 0,

                ]
              }
            ]
          };
          setChartData(updatedChartData);
          setSongTitle(response.data.title || 'Unknown Song');
          setIsLoading(false);
        }
      } catch (err) {
        // console.error('Failed to fetch song analysis:', err); // Debug log removed for production
        setError('Failed to load song analysis data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSongAnalysis();
  }, [id]);

  // if (isLoading) {
  //   return (
  //     <div className="space-y-4">
  //       <Skeleton className="h-8 w-[200px]" />
  //       <Card className='mt-4 p-2'>
  //         <CardHeader>
  //           <Skeleton className="h-6 w-[250px]" />
  //         </CardHeader>
  //         <CardContent>
  //           <Skeleton className="h-4 w-[300px] mb-4" />
  //           <Skeleton className="h-[400px] w-full" />
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="space-y-4">
        <header className="bg-card shadow-sm">
          <div className="p-2">
            <h1 className="text-2xl font-semibold">Song Analysis</h1>
          </div>
        </header>
        <div className="text-red-500 p-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header className="bg-card shadow-sm">
        <div className="p-2">
          <h1 className="text-2xl font-semibold">Song Analysis: {songTitle}</h1>
        </div>
      </header>
      {(!isLoading && chartData) && <AnalyzeResponse chartData={chartData} />}
    </div>
  );
}