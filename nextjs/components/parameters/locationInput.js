import { useData } from '../../context/dataContext';
import { FaCheckCircle } from 'react-icons/fa';

export default function LocationInput() {
  const {
    locsearch, city, lat, long,
    onSetLocSearch, onSetCity, onSetLat, onSetLong
  } = useData();

  // function that verifies value is of expected length
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if value contains only numbers
  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const change = (type, event, setFunction, maxValue = 0) => {
    switch (type) {
      case "text":
        if (verifyLength(event.target.value, maxValue)) {
          setFunction(event.target.value)
        }
        break;
      case "number":
        if (verifyNumber(event.target.value, maxValue)) {
          setFunction(Number(event.target.value))
        }
        break;
      case "select":
        setFunction(event.value)
        break;
      default:
        break;
    }
  };

  return (
    <div className='grid lg:grid-cols-2 gap-2'>
      <div
        className={`location-type ${locsearch === 'city' && 'selected'}`}
        onClick={() => onSetLocSearch('city')}
      >
        <div className='flex-grow lg:flex lg:items-center'>
          <div className=''>
            <label className='block font-bold text-center lg:text-right mb-1 lg:mb-0 pr-4' htmlFor='inline-full-name'>
              City
            </label>
          </div>
          <div className=''>
            <input
              className=''
              id='city'
              type='text'
              placeholder='Nairobi'
              value={city}
              onChange={e => change('text', e, onSetCity)}
            />
          </div>
        </div>
        <div className='selected-icon'>
          <FaCheckCircle size='1.5em' className='text-blue-100' />
        </div>
      </div>
      <div
        className={`location-type ${locsearch === 'geo' && 'selected'}`}
        onClick={() => onSetLocSearch('geo')}
      >
        <div className='flex-grow lg:flex lg:items-center'>
          <div className=''>
            <label className='block font-bold text-center lg:text-right mb-1 lg:mb-0 pr-4' htmlFor='inline-full-name'>
              Lat
            </label>
          </div>
          <div className=''>
            <input
              id='lat'
              type='number'
              value={lat}
              placeholder='1.29'
              onChange={e => change('number', e, onSetLat)}
            />
          </div>
        </div>
        <div className='flex-grow lg:flex lg:items-center'>
          <div className=''>
            <label className='block font-bold text-center lg:text-right mb-1 lg:mb-0 pr-4' htmlFor='inline-full-name'>
              Long
            </label>
          </div>
          <div className=''>
            <input id='lat'
              type='number'
              value={long}
              placeholder='36.80'
              onChange={e => change('number', e, onSetLong)}
            />
          </div>
        </div>
        <div className='selected-icon'>
          <FaCheckCircle size='1.5em' className='text-blue-100' />
        </div>
      </div>
    </div>
  )
}
