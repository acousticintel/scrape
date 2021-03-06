import '../styles/globals.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import Layout from '../components/layout';
import { ProvideData } from '../context/dataContext';
import { ProvideTwitter } from '../context/twitterContext';

function MyApp({ Component, pageProps }) {
  return (
    <ProvideData>
      <ProvideTwitter>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProvideTwitter>
    </ProvideData>
  )
}

export default MyApp
