import Head from 'next/head';
import Sidebar from './sidebar';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Social Search</title>
        <meta name="description" content="Official IEBC diaspora portal." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
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
