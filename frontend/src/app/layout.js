import { ChakraProvider } from '@chakra-ui/react'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './Components/navbar/page'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider store={store}>
        <ChakraProvider>
          <div className='navbar'>
            <Navbar />
          </div>
          {children}
        </ChakraProvider>
        </Provider>
      </body>
    </html>
  )
}
