import { useRouter } from 'next/router'
import { useData } from '../../context/dataContext';
import { CgSearch, CgSearchLoading } from 'react-icons/cg';
import LocationInput from './locationInput';

export default function Parameters() {
  const router = useRouter();
  const { loading, radius, onSetRadius, getTwitterSearch } = useData();

  // function that verifies if value contains only numbers
  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const change = (type, event, setFunction) => {
    switch (type) {
      case "number":
        if (verifyNumber(event.target.value)) {
          setFunction(Number(event.target.value))
        }
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    e.preventDefault();
    getTwitterSearch();
    if (window.location.pathname !== '/results/twitterScrape')
      router.push('results/twitterScrape');
  }

  return (
    <div className='card-parameters'>
      <div className='card-main'>
        <LocationInput />
        <div className='p-2 rounded-xl flex item-center justify-center'>
          <div className='md:flex md:items-center'>
            <div className='md:w-1/3'>
              <label className='block font-bold text-center lg:text-right mb-1 lg:mb-0 pr-4' htmlFor='inline-full-name'>
                Radius (km)
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                id='radius'
                type='number'
                value={radius}
                placeholder='10'
                onChange={e => change('number', e, onSetRadius)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='card-footer'>
        <button onClick={handleClick}>
          {loading ? <>
            <CgSearchLoading size='1.5em' className='mr-2' /> Searching
          </> : <>
            <CgSearch size='1.5em' className='mr-2' /> Search
          </>}
        </button>
      </div>
    </div>
  )
}
