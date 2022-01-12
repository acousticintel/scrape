import { useRouter } from 'next/router';
import { useData } from '../../context/dataContext';
import { FaRegBell } from 'react-icons/fa';
import { CgSearch } from 'react-icons/cg';
import { useTwitter } from '../../context/twitterContext';

export default function Header() {
  const router = useRouter();
  const { keyword, onSetKeyword } = useData();
  const { getTwitterSearch } = useTwitter();

  // function that verifies value is of expected length
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  const change = (type, event, setFunction, maxValue=0) => {
    switch (type) {
      case "text":
        if (verifyLength(event.target.value, maxValue)) {
          setFunction(event.target.value)
        }
        break;
      default:
        break;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    getTwitterSearch();
    if(router.pathname !== '/results/twitterScrape')
      router.push('results/twitterScrape');
  }

  return (
    <header className='header'>
      <h1>Header</h1>
      <form onSubmit={handleClick}>
        <div className='relative text-blue-900 focus-within:text-blue-600'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
            <button type='submit' className='p-1 focus:outline-none focus:shadow-outline'>
              <CgSearch size='1.5em' />
            </button>
          </span>
          <input
            type='search'
            value={keyword}
            autoComplete='off'
            placeholder='Search...'
            onChange={e => change('text', e, onSetKeyword )}
          />
        </div>
      </form>
      <div className='user-info'>
        <div className='notifications'>
          <FaRegBell size='1.5em' className='text-gray-900' />
        </div>
        <div className='avatar'>

        </div>
      </div>
    </header>
  )
}
