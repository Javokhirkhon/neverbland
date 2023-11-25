import '@/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        {children}
        <div className='bg-gray-200 h-80' />
      </body>
    </html>
  )
}
