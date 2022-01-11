import Tweet from "../../components/cards/tweet";
import Header from "../../components/header";
import Loader from "../../components/loader";
import { useData } from "../../context/dataContext";

export default function TwitterScrape() {
  const { loading, twitterRes } = useData();

  return (
    <div className='dashboard'>
      <Header />
      <div className='divider' />
      <div className='card'>
        <div className="card-title">
          <h1>Twitter Search Results</h1>
        </div>
        <div className='mx-4'>
          {
            loading ?
              <div className="flex w-full h-full justify-center items-center mt-10">
                <Loader />
              </div>
              :
              twitterRes?.length > 0 ?
                twitterRes.map((t, i) => {
                  return (
                    <Tweet key={i} t={t} />
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
