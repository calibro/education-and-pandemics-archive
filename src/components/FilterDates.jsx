import * as React from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import Select from 'react-select'

const FilterDates = () => {
  const [startDate, setStartDate] = useQueryParam('dateFrom', StringParam);

  const onChangeStart = (evt) => {
    setStartDate(evt.target.value)
  }

  const months = [
    { value: 1, label: 'January' },
    { value: 1, label: 'February' },
    { value: 1, label: 'March' }
  ]

  return (
    <div className="filter-dates">
      Select the dates range to refine your search.
      <div className="dates-from">
        <label>From</label>
        <select value={startDate} onChange={onChangeStart}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>      
      </div>
    </div>
  );
};

export default FilterDates;