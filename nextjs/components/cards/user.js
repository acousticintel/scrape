import { GoVerified } from 'react-icons/go';
import { FaUserFriends } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

export default function Users({ u }) {
    return (
        <div class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-auto">
            <img class="w-full h-32 object-cover object-center" src={u.profileBannerUrl} alt="avatar" />
            <div class="flex items-center px-6 py-3 bg-gray-900">
                <GoVerified size='1.5em' className='text-blue-300 mr-3 w-auto' />
                <h1 class="mx-3 text-white font-semibold text-lg">{u?.verified ? 'Verified' : 'Not Verified'}</h1>
            </div>
            <div class="py-4 px-6">
                <div className='ml-1.5 text-sm leading-tight'>
                    <span className={'text-xl font-semibold text-gray-800 font-bold block'}>{u?.displayname}</span>
                    <span className={'text-gray-500 font-normal block'}>@{u?.username}</span>
                </div>
                <p class="py-2 text-md text-gray-700">{u?.description}</p>
                <div class="flex items-center mt-4 text-gray-700 text-sm">
                    <FaUserFriends size='1.5em' className='text-blue-300 mr-3 w-auto' />
                    Friends {u?.friendsCount}
                </div>
                <div class="flex items-center mt-4 text-gray-700 text-sm">
                    <FaUserFriends size='1.5em' className='text-blue-300 mr-3 w-auto' />
                    Followers {u?.followersCount}
                </div>
                <div class="flex items-center mt-4 text-gray-700 text-sm">
                    <AiFillStar size='1.5em' className='text-blue-300 mr-3 w-auto' />
                    Favourites {u?.favouritesCount}
                </div>
            </div>
        </div>
    )
}
