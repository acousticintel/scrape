import '../styles/globals.css';
import Layout from '../components/layout';
import { ProvideData } from '../context/dataContext';

function MyApp({ Component, pageProps }) {
  return (
    <ProvideData>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProvideData>
  )
}

export default MyApp
