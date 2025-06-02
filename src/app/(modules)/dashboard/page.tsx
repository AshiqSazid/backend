"use client";

import { fetchSongCount } from '@/api_request/dashboad';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [songCount, setSongCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetchSongCount()
        setSongCount(response)
      } catch (err) {
        console.error('Failed to fetch song count:', err)
        setError('Failed to load song count')
      } finally {
        setLoading(false)
      }
    }
    fetchCount()
  }, [])

  return (
    <>
      <header className="bg-card shadow-sm">
        <div className="p-2">
          <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="bg-violet-500 shadow-sm rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2 text-white">Total Uploaded Songs</h2>
          {loading ? (
            <div className="animate-pulse h-8 w-16 bg-violet-400 rounded"></div>
          ) : error ? (
            <p className="text-red-100">Error loading count</p>
          ) : (
            <p className="text-3xl font-bold text-white">{songCount}</p>
          )}
        </div>
      </div>
    </>
  )
}