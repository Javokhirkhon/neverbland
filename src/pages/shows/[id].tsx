import axios from 'axios'
import React from 'react'
import { API_URL } from '..'
import { Show } from '@/types'
import Image from 'next/image'
import StarRating from 'react-svg-star-rating'

const Show = ({ show }: { show: Show }) => {
  const data = [
    {
      title: 'Show Info',
      data: [
        {
          name: 'Streamed on',
          value: show.network.name,
        },
        {
          name: 'Schedule',
          value: show.schedule.days.join(),
        },
        {
          name: 'Status',
          value: show.status,
        },
        {
          name: 'Genres',
          value: show.genres.join() || '-',
        },
      ],
    },
    {
      title: 'Starring',
      data: show._embedded.cast.map(({ character, person }: any) => ({
        name: person.name,
        value: character.name,
        image: person?.image?.original,
      })),
    },
  ]

  return (
    <>
      <div className='bg-gray-200'>
        <div className='container mx-auto px-4'>
          <h1 className='text-3xl font-bold py-16'>TV Bland</h1>
          <div className='lg:flex items-center pb-8'>
            <div className='relative w-full lg:w-64 h-96'>
              <Image
                src={show.image.original}
                alt={show.name}
                fill
                priority
                sizes='100%'
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className='flex-1 lg:px-20'>
              <div className='flex items-center gap-4 mt-6'>
                <StarRating
                  isReadOnly
                  initialRating={show.rating.average || 0}
                  unit='float'
                  containerClassName='flex'
                  size={20}
                />
                <div className='font-bold'>{show.rating.average || 0} / 5</div>
              </div>
              <h2 className='text-3xl lg:text-5xl my-6'>{show.name}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: show.summary }}
                className='text-lg'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-4 my-16 lg:flex gap-14'>
        {data.map(({ title, data }) => (
          <div key={title} className='flex-1'>
            <div className='text-3xl mb-10'>{title}</div>
            {data.map(({ name, value, image }: any, index: number) => (
              <div
                key={index}
                className='flex items-center lg:border-b-2 pb-4 mb-4 overflow-hidden'
              >
                {image && (
                  <div className='relative w-14 h-14 mr-10 rounded-full overflow-hidden'>
                    <Image
                      src={image}
                      alt={name}
                      fill
                      priority
                      sizes='100%'
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
                <div className='lg:flex items-center'>
                  <div style={{ minWidth: '200px' }}>{name}</div>
                  <div className='flex-1 text-slate-500'>{value}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='bg-gray-200 h-80' />
    </>
  )
}

export default Show

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string }
}) => {
  const response = await axios.get(API_URL + 'shows/' + params.id, {
    params: { embed: 'cast' },
  })
  const show: Show = response.data

  return {
    props: { show },
  }
}
