import Link from 'next/link';
import Image from 'next/image';
//icons
import { FaGoogle, FaTwitter, FaSearchengin, FaUsers } from 'react-icons/fa';
import { CgSearchFound, CgSearch } from 'react-icons/cg';
import { IoFlag } from 'react-icons/io5';
//custom components
import NavTab from './navTab';
import NavTabDrop from './navTabDrop';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-logo'>
        <FaSearchengin size='3em' className='text-gray-100' />
      </div>
      <div className='divider' />
      <NavTab
        text='Search'
        href='/'
        icon={<CgSearch size='1.5em' className='m-2' />}
      />
      <NavTabDrop
        text='Results'
        icon={<CgSearchFound size='1.5em' className='m-2' />}
        list={[
          {
            text: 'Twitter',
            href: '/results/twitterScrape',
            icon: <FaTwitter size='1.5em' className='m-2' />
          },
          {
            text: 'Google',
            href: '/results/twitterScrape',
            icon: <FaGoogle size='1.5em' className='m-2' />
          },
        ]} href='/results' />
      <NavTabDrop
        text='Flagged'
        icon={<IoFlag size='1.5em' className='m-2' />}
        list={[
          {
            text: 'Users',
            href: '/flagged/users',
            icon: <FaUsers size='1.5em' className='m-2' />
          },
          {
            text: 'Tweets',
            href: '/results/twitterScrape',
            icon: <FaTwitter size='1.5em' className='m-2' />
          },
        ]} href='/flagged' />
    </div>
  )
}
