import NextImage from 'next/image'

type ImageProps = {
  src: string
  alt: string
  styles: string
  priority?: boolean | undefined
}

const Image = ({ src, alt, priority, styles }: ImageProps) =>
  src ? (
    <div className={`relative ${styles}`}>
      <NextImage
        {...{ src, alt, priority }}
        fill
        sizes='100%'
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  ) : (
    <div className={`bg-gray-200 ${styles}`} />
  )

export default Image
