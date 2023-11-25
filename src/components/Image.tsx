import NextImage from 'next/image'

type ImageProps = {
  src: string
  alt: string
  styles: string
  priority?: boolean | undefined
}

const Image = ({ src, alt, styles, priority }: ImageProps) => (
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
)

export default Image
