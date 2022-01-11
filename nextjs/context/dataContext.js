import { useState, useEffect, createContext, useContext } from "react";

const dataContext = createContext();

export function ProvideData({ children }) {
  const data = useProvideData();
  return (
    <dataContext.Provider value={data}>
      {children}
    </dataContext.Provider>
  )
}

export const useData = () => {
  return useContext(dataContext)
}

function useProvideData() {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [locsearch, setLocSearch] = useState('city');

  const [city, setCity] = useState('Nairobi');
  const [lat, setLat] = useState(1.29);
  const [long, setLong] = useState(36.80);

  const [radius, setRadius] = useState(100);

  const [twitterRes, setTwitterRes] = useState([]);

  const onSetKeyword = (val) => setKeyword(val);
  const onSetLocSearch = (val) => setLocSearch(val);
  const onSetCity = (val) => setCity(val);
  const onSetLat = (val) => setLat(val);
  const onSetLong = (val) => setLong(val);
  const onSetRadius = (val) => setRadius(val);
  const onSetLoading = (val) => setLoading(val);
  //const onSetTwitterRes = (val) => twitterRes.length > 0 && setTwitterRes(val);
  const onSetTwitterRes = (val) => setTwitterRes(val);

  useEffect(() => {
    if(twitterRes?.length > 0){
      console.log(twitterRes)
    }
  }, [twitterRes])

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
            lat, long,
            radius
          };

          axios.post('http://localhost:5000/twitter-search', body, {
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(function (response) {
              onSetLoading(false);
              let res = response.data;
              onSetTwitterRes(JSON.parse(res));
              resolve(true);
            })
            .catch(function (error) {
              onSetLoading(false);
              console.log(error);
              reject (false);
            });
        } catch (error) {
          onSetLoading(false);
          console.log(error);
          reject (false);
        };
      };
    });
  }

  return {
    loading, keyword, locsearch,
    city, lat, long, radius, twitterRes,
    onSetLoading, onSetKeyword, onSetLocSearch,
    onSetCity, onSetLat, onSetLong, onSetRadius,
    getTwitterSearch
  }
}

