import Layout from 'components/Layout'
import '../styles/globals.css'

export default function App({
  Component,
  pageProps: { ...pageProps } }) {
  return (

    <Layout>
      <Component {...pageProps} />
    </Layout>

  )
}

