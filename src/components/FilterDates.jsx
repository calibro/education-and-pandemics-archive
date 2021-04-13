import * as React from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import Select from 'react-select'

const FilterDates = () => {
  const [startDate, setStartDate] = useQueryParam('dateFrom', StringParam);

  const onChangeStart = (evt) => {
    setStartDate(evt.target.value)
  }

  return (
    <div className="filter-dates">
      Select the dates range to refine your search.
      <div className="dates-from">
        <label>From</label>
        <select value={startDate} onChange={onChangeStart}>
        </select>
      </div>
    </div>
  );
};

export default FilterDates;