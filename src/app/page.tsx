import Shows from '@/sections/Shows'

const HomePage = () => (
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
    <Shows />
  </>
)

export default HomePage
