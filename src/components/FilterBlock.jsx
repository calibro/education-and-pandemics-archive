import * as React from 'react';
import { useQueryParam, ArrayParam } from 'use-query-params';

const UseQueryParamExample = (props) => {
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
    <div>
      <div className="filter-title">{props.blockTitle}</div>
      <ul>
        {props.filterItems.map(filter =>{
          const val = filter.fields[props.labelBy]
           return <li>
             <label>
              <input type="checkbox"
                checked={paramsArray.includes(val)} 
                value={val} 
                onChange={() => onChange(val)}
                ></input>
                {val} ({filter.fields['Count']})
             </label>
             
           </li>
        })}
      </ul>
    </div>
  );
};

export default UseQueryParamExample;