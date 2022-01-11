import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/header';
import Parameters from '../components/parameters';

export default function Home() {
  return (
    <div className='dashboard'>
      <Header />
      <div className='divider' />
      <div className='card'>
        <div className="card-title">
          <h1>Search Parameters</h1>
        </div>
        <div className='card-content'>
          <Parameters/>
        </div>
      </div>
    </div>
  )
}
