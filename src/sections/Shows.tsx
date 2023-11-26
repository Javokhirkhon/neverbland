'use client'

import Image from '@/components/Image'
import Skeleton from '@/components/Loader/Skeleton'
import Star from '@/components/Star'
import { Show } from '@/types'
import { getTodayDate } from '@/utils/getTodayDate'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Shows = () => {
  const [selectedDate, setSelectedDate] = useState(getTodayDate())
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Effect to fetch data when the selected date changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({ date: selectedDate })
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}schedule?${params.toString()}`
        )

        const data = await response.json()
        setShows(data.map(({ show }: { show: Show }) => show))
      } catch (error) {
        setError('Error fetching shows')
        console.error('Error fetching shows:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedDate])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center justify-between text-lg mb-4'>
        <div>Last Added Shows</div>
        <div className='flex items-center gap-4'>
          <div className='hidden lg:block'>Date:</div>
          <input
            type='date'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} />)
        ) : error ? (
          <div className='text-red-500'>{error}</div>
        ) : shows.length === 0 ? (
          <div>No shows found for the selected date.</div>
        ) : (
          shows.map(({ id, name, image, rating }, index) => (
            <Link key={index} href={`/show/${id}`} className='p-2 hover:shadow'>
              <Image src={image?.medium} alt={name} styles='w-full h-80 mb-2' />
              <Star rating={rating.average} />
              <div className='mt-2'>{name}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Shows
