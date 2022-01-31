import { useState, useEffect, createContext, useContext } from "react";
import { db } from '../firebase';
import { doc, collection, addDoc, query, onSnapshot, orderBy } from "@firebase/firestore";
//context
import { useData } from "./dataContext";
import { containsObject } from "./utils";

const twitterContext = createContext();

export function ProvideTwitter({ children }) {
  const data = useProvideTwitter();
  return (
    <twitterContext.Provider value={data}>
      {children}
    </twitterContext.Provider>
  )
}

export const useTwitter = () => {
  return useContext(twitterContext)
}

function useProvideTwitter() {
  const { keyword, locsearch, city, lat, long, radius, dateRange } = useData();
  const [loading, setLoading] = useState(false);
  const [twitterRes, setTwitterRes] = useState([]);
  const [flaggedUsers, setFlaggedUsers] = useState([]);

  const onSetLoading = (val) => setLoading(val);
  const onSetTwitterRes = (val) => setTwitterRes(val);
  const onSetFlaggedUsers = (val) => setFlaggedUsers(val);

  useEffect(() => {
    if (twitterRes?.length > 0) {
      console.log(twitterRes)
    }
  }, [twitterRes])

  useEffect(() => {
    getFlaggedUsers();
  }, [])

  async function getTwitterSearch() {
    return new Promise((resolve, reject) => {
      onSetLoading(true);
      if (!loading) {
        try {
          const axios = require('axios');

          let body = {
            keyword,
            locsearch,
            city,
            latlong: { lat, long },
            radius,
            dateRange
          };

          axios.post('https://scrapeapi.acousticintel.com/twitter-search', body, {
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(function (response) {
              onSetLoading(false);
              let res = response.data;
              onSetTwitterRes(JSON.parse(res));
              resolve(true);
            });
        } catch (error) {
          onSetLoading(false);
          console.log(error);
          reject(false);
        };
      };
    });
  }

  async function flagUser(user) {
    return new Promise((resolve, reject) => {
      try {
        addDoc(collection(db, `flagged/twitter/users`), user)
          .then(docRef => {
            resolve({ status: 200 })
          });
      } catch (error) {
        reject({ status: 500, mess: error })
      }
    });
  }

  async function flagTweet(tweet) {
    return new Promise((resolve, reject) => {
      try {
        addDoc(collection(db, `flagged/twitter/tweets`), tweet)
          .then(docRef => {
            resolve({ status: 200 })
          });
      } catch (error) {
        reject({ status: 500, mess: error })
      }
    });
  }

  async function getFlaggedUsers() {
    const q = query(collection(db, 'flagged/twitter/users'), orderBy("username", "asc"));
    const flagged = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      onSetFlaggedUsers(users);
    });
  }

  async function isUserFlagged(user) {
    if (flaggedUsers?.length > 0) {
      let res = containsObject(user, flaggedUsers)
      return res;
    }
  }



  return {
    loading, onSetLoading,
    twitterRes, getTwitterSearch,
    flagUser, flagTweet,
    flaggedUsers, isUserFlagged
  }
}

