//custom
import { motion } from 'framer-motion';
//contexts
import { useTwitter } from "../../context/twitterContext";
//custom components
import Header from "../../components/header";
import Loader from "../../components/loader";
import Users from '../../components/cards/user';


export default function FlaggedUsers() {
  const { loading, flaggedUsers } = useTwitter();

  return (
    <div className='dashboard'>
      <Header />
      <div className='divider' />
      <div className='card'>
        <div className="card-title">
          <h1>Flagged Users</h1>
        </div>
        <div className='mx-4'>
          {
            loading ?
              <div className="flex w-full h-full justify-center items-center mt-10">
                <Loader />
              </div>
              :
              flaggedUsers?.length > 0 ?
                flaggedUsers.map((u, i) => {
                  return (
                    <Users key={i} u={u} />
                  )
                })
                :
                <div className="w-full bg-white shadow-md 
                rounded-lg p-10 text-center mt-10 text-2xl 
                font-extrabold">
                  <p>No content to display</p>
                </div>
          }
        </div>
      </div>
    </div>
  )
}
