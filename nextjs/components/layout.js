import Head from 'next/head';
import Sidebar from './sidebar';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Social Search</title>
        <meta name="description" content="Official IEBC diaspora portal." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='page-content'>
        <div className="flex min-w-full mx-auto">
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  )
}
