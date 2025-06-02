'use client'

import base from '@/api_request/axios'
import END_POINTS from '@/api_request/endPoints'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Song = {
  id: string
  title: string
  createdAt: string,
  is_analyzed: boolean
}

export default function SongList() {
  const [data, setData] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // You can make this configurable
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await base.get(END_POINTS.music_get, {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        })

        if (response.data && response.data) {
          console.log(response.data)
          setData(response.data.data)
          setTotalItems(response?.data?.pagination?.totalItems || response.data.data.length)
        } else {
          throw new Error('Invalid response structure')
        }
      } catch (err) {
        console.error('Failed to fetch songs:', err)
        setError('Failed to load songs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage, itemsPerPage])

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Song List</h1>
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Song List</h1>
      <div className='p-2 container'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data?.map((song) => (
              <TableRow key={song.id}>
                <TableCell>{song.id}</TableCell>
                <TableCell>{song.title}</TableCell>
                <TableCell>{moment(song.createdAt).format('DD-MM-YYYY HH:mm')}</TableCell>
                <TableCell>{song?.is_analyzed ?
                  <Badge className='bg-green-500 text-white' >Completed</Badge> : <Badge className='bg-orange-500 text-white'>Processing</Badge>
                }


                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/song-list/${song.id}`} passHref>
                    <button
                      disabled={!song?.is_analyzed}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      View
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} songs
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed text-gray-900' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show up to 5 page buttons
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 rounded-md ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed text-gray-900' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}