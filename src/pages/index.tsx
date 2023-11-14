import { Show } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import StarRating from 'react-svg-star-rating'

export const API_URL = 'https://api.tvmaze.com/'

const Home = ({ shows }: { shows: Show[] }) => (
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
          <Link key={index} href={`/shows/${id}`} className='p-2 hover:shadow'>
            <div className='relative w-full h-80 mb-2'>
              <Image
                src={image.original}
                alt={name}
                fill
                priority
                sizes='100%'
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <StarRating
              isReadOnly
              initialRating={rating.average || 0}
              unit='float'
              containerClassName='flex'
              size={20}
            />
            <div className='mt-2'>{name}</div>
          </Link>
        ))}
      </div>
    </div>
    <div className='bg-gray-200 h-80' />
  </>
)

export default Home

export const getStaticProps = async () => {
  const response = await axios.get(API_URL + 'schedule')
  const shows: Show[] = response.data.map(({ show }: { show: Show }) => show)

  return {
    props: { shows },
  }
}
