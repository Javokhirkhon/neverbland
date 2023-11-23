import { Show } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export const API_URL = 'https://api.tvmaze.com/'

async function getShows() {
  const response = await fetch(API_URL + 'schedule', {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch shows')
  }

  const shows = await response.json()

  return shows.map(({ show }: { show: Show }) => show)
}

const HomePage = async () => {
  const shows: Show[] = await getShows()
  return (
    <>
      <div className='bg-gray-200'>
        <div className='container mx-auto px-4'>
          <h1 className='text-3xl font-bold py-16'>TV Bland</h1>
          <p className='text-lg text-slate-500 pb-20'>
            TV Show and web series database. Create personalised schedules.
            <br />
            Episode guide, cast, crew and character information.
          </p>
        </div>
      </div>
      <div className='container mx-auto p-4'>
        <div className='text-lg mb-4'>Last Added Shows</div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          {shows.map(({ id, name, image, rating }, index) => (
            <Link key={index} href={`/show/${id}`} className='p-2 hover:shadow'>
              <div className='relative w-full h-80 mb-2'>
                <Image
                  src={image?.original}
                  alt={name}
                  fill
                  priority
                  sizes='100%'
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className='mt-2'>{name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className='bg-gray-200 h-80' />
    </>
  )
}

export default HomePage
