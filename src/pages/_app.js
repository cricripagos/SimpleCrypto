import '@/styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'react-redux'
import store from '@/store/store'
// import localFont from '@next/font/local'

// const surt = localFont({
//   src: "../public/fonts/nunito.ttf",
//   variable: "--font-nunito",
// })

export default function App({ Component, pageProps }) {
  return (
    <main>
      <Provider store={store}>
        {/* <AnimatePresence mode="wait" initial={false}> */}
        <AnimatePresence mode="wait">
          <Component {...pageProps} />
        </AnimatePresence>
      </Provider>
    </main>
  )
}
