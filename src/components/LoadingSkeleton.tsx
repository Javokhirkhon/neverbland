import Star from '@/components/Star'

const LoadingSkeleton = () => (
  <div className='animate-pulse bg-gray-300 p-2 hover:shadow'>
    <div className='w-full h-80 mb-2 bg-gray-400' />
    <Star rating={0} />
    <div className='w-full h-4 bg-gray-400 mt-2' />
  </div>
)

export default LoadingSkeleton
