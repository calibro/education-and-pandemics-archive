import * as React from 'react';
import { useQueryParam, StringParam, NumberParam } from 'use-query-params';
import Select from 'react-select'

const FilterDates = () => {
  const [startDate, setStartDate] = useQueryParam('dateFrom', NumberParam);
  const [endDate, setEndDate] = useQueryParam('dateTo', StringParam);


  const yearOptions = Array(100).fill().map((_, idx) => {
    return { value: 1920 + idx, label: 1920 + idx }
  })

  const onChangeStart = (item) => {
    setStartDate(item.value)
  }

  return (
    <div className="filter-dates">
      Select the dates range to refine your search.
      <div className="dates-from">
        <label>From</label>
        <Select classNamePrefix="custom-select" 
          options={yearOptions} 
          onChange={onChangeStart}
          value={startDate}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#F3EFE6',
              neutral0: '#FFFFF',
              primary25: '#FBFAF7'
            },
          })}/>
      </div>
    </div>
  );
};

export default FilterDates;