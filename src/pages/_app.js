import '@/styles/globals.css'
// import localFont from '@next/font/local'

// const surt = localFont({
//   src: "../public/fonts/nunito.ttf",
//   variable: "--font-nunito",
// })

export default function App({ Component, pageProps }) {
  return (
  <main>
    <Component {...pageProps} />
    </main>
    )
}
