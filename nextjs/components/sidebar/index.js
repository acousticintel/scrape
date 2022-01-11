import Link from 'next/link';
import Image from 'next/image';
//icons
import { FaSearchengin} from 'react-icons/fa';
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
      <NavTab text='Search' href='/' icon={true} />
      <NavTabDrop text='Results' list={[
        { text:'Twitter', href:'/results/twitterScrape' },
        { text:'Test 2', href:'/results/2' },
      ]} href='/results' />
    </div>
  )
}
