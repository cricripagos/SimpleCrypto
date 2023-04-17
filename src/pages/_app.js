import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
// import localFont from '@next/font/local'

// const surt = localFont({
//   src: "../public/fonts/nunito.ttf",
//   variable: "--font-nunito",
// })

export default function App({ Component, pageProps }) {
  return (
  <main>
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
  </main>
    )
}
