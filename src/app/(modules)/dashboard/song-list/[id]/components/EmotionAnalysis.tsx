"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Tooltip, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts"

const EMOTION_DESCRIPTIONS = {
    Uplifting: "Inspires positive emotions, hope, or elevates mood",
    Distracting: "Diverts attention from negative thoughts or provides mental escape",
    Reappraisal: "Helps reinterpret situations in a more positive/constructive way",
    Motivating: "Energizes listeners and drives them toward action or goals",
    Relaxing: "Calms the listener and reduces stress or anxiety",
    Suppressing: "Helps suppress or control negative emotions",
    Destressing: "Reduces stress or anxiety, promoting relaxation and calmness",
};

interface ChartData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
    }[];
}

export default function EmotionAnalysis({ chartData }: { chartData: ChartData }) {
    console.log("🚀 ~ EmotionAnalysis ~ chartData:", JSON.stringify(chartData))
    // Transform data and ensure colors are properly mapped
    const transformedData = chartData.labels.map((label, index) => ({
        name: label,
        value: chartData.datasets[0].data[index],
        fill: chartData.datasets[0].backgroundColor[index], // Using 'fill' instead of 'color'
        borderColor: chartData.datasets[0].borderColor[index]
    }));

    const dominantEmotion = transformedData.reduce((prev, current) => 
        (prev.value > current.value ? prev : current)
    );

    return (
        <Card className='mt-4 p-2'>
            <CardHeader>
                <CardTitle>Emotional Impact Analysis</CardTitle>
                <div className="text-sm text-muted-foreground">
                    Dominant emotion: <span 
                        className="font-medium" 
                        style={{ color: dominantEmotion.borderColor }}
                    >
                        {dominantEmotion.name}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                {/* Emotion Legend */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {transformedData.map((item) => (
                        <div key={item.name} className="flex items-start gap-3">
                            <div
                                className="w-4 h-4 mt-1 rounded-sm flex-shrink-0"
                                style={{
                                    backgroundColor: item.fill,
                                    border: `1px solid ${item.borderColor}`
                                }}
                            />
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {EMOTION_DESCRIPTIONS[item.name as keyof typeof EMOTION_DESCRIPTIONS]} - {(item.value * 100).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={transformedData}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                        >
                            <XAxis 
                                type="number" 
                                domain={[0, 1]}
                                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                            />
                            <YAxis 
                                dataKey="name" 
                                type="category" 
                                width={100}
                                tickLine={false}
                            />
                            <Tooltip 
                                formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Score']}
                                labelFormatter={(label) => `Emotion: ${label}`}
                            />
                            <Bar
                                dataKey="value"
                                radius={[0, 4, 4, 0]}
                            >
                                {transformedData.map((entry: { fill: string; borderColor: string }, index: number) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.fill} 
                                        stroke={entry.borderColor}
                                    />
                                ))}
                                <LabelList
                                    dataKey="value"
                                    position="right"
                                    formatter={(value: number) => `${(Number(value) * 100).toFixed(1)}%`}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}