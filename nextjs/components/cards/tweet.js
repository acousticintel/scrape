import { useEffect, useState } from 'react';
//custom
import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
//icons
import { FaTwitter, FaRetweet } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoChatbubbleOutline, IoFlag } from 'react-icons/io5';
//context
import { useTwitter } from '../../context/twitterContext';


export default function Tweet({ t }) {
  const { flagUser, flagTweet, flaggedUsers, isUserFlagged } = useTwitter();
  const [dropOpen, setDropOpen] = useState(false);
  const [flagged, setFlagged] = useState(false);

  const handleFlagUser = async () => {
    let res = await flagUser(t.user);
  }

  const handleFlagTweet = async () => {
    let res = await flagTweet(t);
  }

  useEffect(() => {
    async function flgd(t){
      if (t.user) {
        let res = await isUserFlagged(t.user);
        if (res) {
          setFlagged(true);
        }
      }
    }
    flgd(t)
  }, [t, flaggedUsers])

  return (
    <>
      <div className='bg-white border-gray-200 p-4 rounded-xl border max-w-xl my-3 mx-auto'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <div className={`h-14 w-14 rounded-full flex justify-center 
            items-center transition-all duration-500
            ${flagged && 'bg-red-600'}`}>
              <img className='h-11 w-11 rounded-full' src={t?.user?.profileImageUrl} />
            </div>
            <div className='ml-1.5 text-sm leading-tight'>
              <span className={`${flagged ? 'text-red-600' : 'text-gray-800'} font-bold block`}>{t?.user?.displayname}</span>
              <span className={`${flagged ? 'text-red-400' : 'text-gray-500'} font-normal block`}>@{t?.user?.username}</span>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <button
              onClick={() => setDropOpen(!dropOpen)}
              onBlur={() => setDropOpen(false)}
              className='relative flex items-center justify-center'>
              <IoFlag size='1.5em'
                className='text-red-600 mr-3 w-auto'
              />
              <Transition
                show={dropOpen}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none' role='menu' aria-orientation='vertical' aria-labelledby='user-menu-button' tabIndex='-1'>
                  {
                    // Active: 'bg-gray-100', Not Active: '' 
                  }
                  <a onMouseDown={handleFlagUser} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-800' role='menuitem' tabIndex='-1' id='user-menu-item-0'>Flag User</a>
                  <a onMouseDown={handleFlagTweet} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-800' role='menuitem' tabIndex='-1' id='user-menu-item-2'>Flag Tweet</a>
                </div>
              </Transition>
            </button>
            <FaTwitter size='1.5em' className='text-blue-400  w-auto inline-block' />
          </div>

        </div>
        <p className='text-black  block text-xl leading-snug mt-3'>{t.renderedContent}</p>
        {
          t?.media !== null &&
          t.media.map((im, i) => {
            let src = im.thumbnailUrl || im.previewUrl
            return (
              <img
                key={i}
                className='mt-2 rounded-2xl border border-gray-100'
                src={src} />
            )
          })
        }
        <p className='text-gray-500 text-base py-1 my-0.5'>10:05 AM · Dec 19, 2020</p>
        <div className='border-gray-200 border-t my-1'></div>
        <div className='text-gray-500 flex'>
          <div className='flex items-center mr-6'>
            <AiOutlineHeart size='1.5em' className='inline-block' />
            <span className='ml-3'>{t?.likeCount}</span>
          </div>
          <div className='flex items-center mr-6'>
            <FaRetweet size='1.5em' className='inline-block' />
            <span className='ml-3'>{t?.retweetCount}</span>
          </div>
          <div className='flex items-center mr-6'>
            <IoChatbubbleOutline size='1.5em' className='inline-block' />
            <span className='ml-3'>{t?.quoteCount} people are Tweeting about this</span>
          </div>
        </div>
      </div>
    </>
  )
}
