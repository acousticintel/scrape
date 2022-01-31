import { useState, useEffect } from "react";
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { useData } from "../../context/dataContext";

export default function DateRangeComp() {
  const { onSetDateRange } = useData();
  const [selectedDate, handleDateChange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    console.log(ranges);
    handleDateChange(ranges.selection);
  }

  const formatDate = (dt) => {
    return format(dt, 'yyyy-MM-dd')
  }

  const defaultDates = () => {
    let temp = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    };

    let newdate = temp.startDate;
    newdate.setDate(newdate.getDate() - 1); // minus the date

    temp.startDate = new Date(newdate);
    handleDateChange(temp);
  }

  useEffect(() => {
    let st = `since:${formatDate(selectedDate.startDate)}`;
    let ut = `until:${formatDate(selectedDate.endDate)}`;
    let s = `${st} ${ut}`
    onSetDateRange(s);
  }, [selectedDate])

  useEffect(() => {
    defaultDates();
  }, [])

  return (
    <div className='date-para'>
      <h1>Date Range</h1>
      <div className='cont'>
        <DateRange
          showPreview={false}
          maxDate={new Date()}
          ranges={[selectedDate]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={true}
          retainEndDateOnFirstSelection={true}
          startDatePlaceholder={'Search From Date'}
          endDatePlaceholder={'To Date'}
        />
      </div>
    </div>

  );
};
