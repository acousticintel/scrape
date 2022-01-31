import { useState } from 'react';
import { useRouter } from 'next/router';
//custom
import { motion } from 'framer-motion';

//context
import { useData } from '../../context/dataContext';
import { useTwitter } from '../../context/twitterContext';
//custom components
import LocationInput from './locationInput';
//custom icons
import { CgSearch, CgSearchLoading } from 'react-icons/cg';
import DateRange from './dateRange';

const containerVar = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
      delayChildren: 1
    }
  }
}

const parametersVar = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.1,
    }
  }
}

export default function Parameters() {
  const router = useRouter();
  const { radius, onSetRadius } = useData();
  const { loading, getTwitterSearch } = useTwitter();

  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({});

  const toggle = () => setOpen(!open);

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

  const handleClick = (e) => {
    e.preventDefault();
    getTwitterSearch();
    if (window.location.pathname !== '/results/twitterScrape')
      router.push('results/twitterScrape');
  }

  return (
    <div className='card-parameters'>
      <motion.div
        className='card-main'
        variants={containerVar}
        initial='hidden'
        animate='show'
      >
        <LocationInput />
        <motion.div
          className='my-8 mx-auto shadow-xl max-w-md 
        rounded-md flex item-center justify-center 
        bg-white transform scale-10 '
          variants={parametersVar}
        >
          <div className='md:flex md:items-center my-5'>
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
        </motion.div>
        <motion.div variants={parametersVar}>
          <DateRange />
        </motion.div>
      </motion.div>
      <motion.div
        className='card-footer'
        variants={parametersVar}
      >
        <motion.button
        className='search'
          onClick={handleClick}
          variants={parametersVar}
        >
          {loading ? <>
            <CgSearchLoading size='1.5em' className='mr-3' /> Searching
          </> : <>
            <CgSearch size='1.5em' className='mr-3' /> Search
          </>}
        </motion.button>
      </motion.div>
    </div>
  )
}
