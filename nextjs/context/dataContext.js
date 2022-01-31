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
  const [keyword, setKeyword] = useState('');
  const [locsearch, setLocSearch] = useState('city');
  const [city, setCity] = useState('Nairobi');
  const [lat, setLat] = useState(1.29);
  const [long, setLong] = useState(36.80);
  const [radius, setRadius] = useState(1000);
  const [dateRange, setDateRange] = useState('');

  const onSetKeyword = (val) => setKeyword(val);
  const onSetLocSearch = (val) => setLocSearch(val);
  const onSetCity = (val) => setCity(val);
  const onSetLat = (val) => setLat(val);
  const onSetLong = (val) => setLong(val);
  const onSetRadius = (val) => setRadius(val);
  const onSetDateRange = (val) => setDateRange(val);

  useEffect(() => {
    let d = dateRange;

    console.log(d)
  }, [dateRange])

  return {
    keyword, locsearch, city, lat, long, radius, dateRange,
    onSetKeyword, onSetLocSearch,onSetCity, onSetLat, 
    onSetLong, onSetRadius, onSetDateRange
  }
}

