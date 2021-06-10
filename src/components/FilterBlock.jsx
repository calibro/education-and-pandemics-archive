import * as React from 'react';
import { useQueryParam, ArrayParam } from 'use-query-params';

const FilterBlock = (props) => {
  const [params, setFilterValue] = useQueryParam(props.filterName, ArrayParam);

  const paramsArray = params || []

  const onChange = (value) => {
    if(paramsArray.includes(value)){
      paramsArray.splice(paramsArray.indexOf(value), 1)
    } else {
      paramsArray.push(value)
    }
    setFilterValue(paramsArray)
  }

  return (
    <div className="filter-list">
        {props.filterItems.map(filter =>{
          const val = filter.fields[props.valueBy] || filter.fields[props.labelBy]
          const label = filter.fields[props.labelBy]
          const isSelected = paramsArray.includes(val)
           return (
             <label className={`filter-list-item ${isSelected ? "checked" : " "}`}>
              <div className="circle-checkbox"></div>
              <input type="checkbox"
                checked={isSelected} 
                value={val} 
                onChange={() => onChange(val)}
                ></input>
                {label} ({filter.fields['Count']})
             </label>
           )
        })}
    </div>
  );
};

export default FilterBlock;