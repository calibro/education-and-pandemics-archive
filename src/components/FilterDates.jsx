import * as React from 'react';
import { useQueryParam, StringParam, NumberParam } from 'use-query-params';
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const FilterDates = () => {
  const [startDate, setStartDate] = useQueryParam('dateFrom', NumberParam);
  const [endDate, setEndDate] = useQueryParam('dateTo', NumberParam);


  const onChangeStart = (date) => {
    let v = date? Date.UTC(date.getUTCFullYear(), date.getUTCMonth()) : null
    setStartDate(v)
  }
  const onChangeEnd = (date) => {
    let v = date? Date.UTC(date.getUTCFullYear(), date.getUTCMonth()) : null
    setEndDate(v)
  }

  return (
    <div className="filter-dates">
      Select the dates range to refine your search.
      <div className="date-input dates-from">
        <label>From</label>
        <DatePicker
          selected={startDate}
          onChange={date => onChangeStart(date)}
          dateFormat="MM/yyyy"
          placeholderText="Month / Year"
          showMonthYearPicker
        />
      </div>
      <div className="date-input dates-to">
        <label>To</label>
        <DatePicker
          selected={endDate}
          onChange={date => onChangeEnd(date)}
          dateFormat="MM/yyyy"
          placeholderText="Month / Year"
          showMonthYearPicker
        />
      </div>
    </div>
  );
};

export default FilterDates;