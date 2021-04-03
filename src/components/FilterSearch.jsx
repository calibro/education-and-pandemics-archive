import * as React from 'react';
import { useQueryParam, StringParam } from 'use-query-params';

const FilterSeach = (props) => {
  const [seachQ, setFilterValue] = useQueryParam('search', StringParam);


  const onChange = (value) => {
    setFilterValue(value)
  }

  return (
    <input type="text" 
      placeholder="search" value={seachQ}
      onChange={(e) => onChange(e.target.value)}></input>
  );
};

export default FilterSeach;