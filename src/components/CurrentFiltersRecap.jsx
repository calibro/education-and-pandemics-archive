import { useQueryParam, ArrayParam } from 'use-query-params';

const CurrentFiltersRecap = ({filterKey}) => {
  const [params, setFilterValue] = useQueryParam(filterKey, ArrayParam);

  const paramsArray = params || []

  const onRemove = (value) => {
    if(paramsArray.includes(value)){
      paramsArray.splice(paramsArray.indexOf(value), 1)
    }
    setFilterValue(paramsArray)
  }

  return paramsArray.map(value =>
      <div className="filter-recap-item" onClick={() => onRemove(value)}>{value} <span>X</span></div>
  )
}

export default CurrentFiltersRecap;