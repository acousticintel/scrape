//custom
import { FaTwitter, FaRetweet } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';

export default function Tweet({ t }) {
  return (
    <>
      <div className="bg-white border-gray-200 p-4 rounded-xl border max-w-xl my-3 mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img className="h-11 w-11 rounded-full" src={t?.user?.profileImageUrl} />
            <div className="ml-1.5 text-sm leading-tight">
              <span className="text-black font-bold block ">{t?.user?.displayname}</span>
              <span className="text-gray-500 font-normal block">@{t?.user?.username}</span>
            </div>
          </div>
          <FaTwitter size='1.5em' className='text-blue-400 -6 w-auto inline-block' />
        </div>
        <p className="text-black  block text-xl leading-snug mt-3">{t.renderedContent}</p>
        {
          t?.media !== null &&
          t.media.map((im, i) => {
            let src = im.thumbnailUrl || im.previewUrl
            return (
              <img
                key={i}
                className="mt-2 rounded-2xl border border-gray-100"
                src={src} />
            )
          })
        }
        <p className="text-gray-500 text-base py-1 my-0.5">10:05 AM · Dec 19, 2020</p>
        <div className="border-gray-200 border-t my-1"></div>
        <div className="text-gray-500 flex">
          <div className="flex items-center mr-6">
            <AiOutlineHeart size='1.5em' className='inline-block' />
            <span className="ml-3">{t?.likeCount}</span>
          </div>
          <div className="flex items-center mr-6">
            <FaRetweet size='1.5em' className='inline-block' />
            <span className="ml-3">{t?.retweetCount}</span>
          </div>
          <div className="flex items-center mr-6">
            <IoChatbubbleOutline size='1.5em' className='inline-block' />
            <span className="ml-3">{t?.quoteCount} people are Tweeting about this</span>
          </div>
        </div>
      </div>
    </>
  )
}
