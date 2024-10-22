import { Inter } from 'next/font/google'
import './ui/globals.css'
//import './ui/dashboard/calendar/calender.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gestion des chèques',
  description: 'etap',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
