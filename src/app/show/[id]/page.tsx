import { Show } from '@/types'
import Star from '@/components/Star'
import Image from '@/components/Image'

async function getShow(id: string) {
  const params = new URLSearchParams({ embed: 'cast' })
  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }shows/${id}?${params.toString()}`

  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error('Failed to fetch show')
  }

  const show = await response.json()

  return show
}

const ShowPage = async ({ params: { id } }: { params: { id: string } }) => {
  const show: Show = await getShow(id)

  const data = [
    {
      title: 'Show Info',
      avatar: false,
      data: [
        {
          name: 'Streamed on',
          value: show.network?.name,
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
      avatar: true,
      data: show._embedded.cast.map(({ character, person }: any) => ({
        name: person.name,
        value: character.name,
        image: person?.image?.medium,
      })),
    },
  ]

  return (
    <>
      <div className='bg-gray-200'>
        <div className='container mx-auto px-4'>
          <h1 className='text-3xl font-bold py-16'>TV Bland</h1>
          <div className='lg:flex items-center pb-8'>
            <Image
              src={show.image.original}
              alt={show.name}
              priority
              styles='w-full lg:w-64 h-96'
            />
            <div className='flex-1 lg:px-20'>
              <div className='flex items-center gap-4 mt-6 text-lg'>
                <Star rating={show.rating.average} />
                <div className='font-bold'>
                  {(show.rating.average || 0) / 2} / 5
                </div>
              </div>
              <h2 className='text-3xl lg:text-5xl my-6'>{show.name}</h2>
              <div dangerouslySetInnerHTML={{ __html: show.summary }} />
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-4 my-16 lg:flex gap-14'>
        {data.map(({ title, avatar, data }) => (
          <div key={title} className='flex-1'>
            <div className='text-3xl mb-10'>{title}</div>
            {data.map(({ name, value, image }: any, index: number) => (
              <div
                key={index}
                className='flex items-center lg:border-b-2 pb-4 mb-4 overflow-hidden'
              >
                {avatar && (
                  <Image
                    src={image}
                    alt={name}
                    priority
                    styles='w-14 h-14 mr-10 rounded-full overflow-hidden'
                  />
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
    </>
  )
}

export default ShowPage
