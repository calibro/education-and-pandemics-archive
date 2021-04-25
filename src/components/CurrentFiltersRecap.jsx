import { useQueryParam, ArrayParam } from 'use-query-params';
import moment from 'moment'

const CurrentFiltersRecap = ({filterKey}) => {
  const [params, setFilterValue] = useQueryParam(filterKey, ArrayParam);

  const paramsArray = params || []

  const onRemove = (value) => {
    if(paramsArray.includes(value)){
      paramsArray.splice(paramsArray.indexOf(value), 1)
    }
    setFilterValue(paramsArray)
  }

  return paramsArray.map(value => {
    let displayValue = value
    if (filterKey.indexOf('date') >= 0 && moment(+value).isValid()) {
      displayValue = moment(+value).format('MM/YYYY')
    }
    return <div className="filter-recap-item" onClick={() => onRemove(value)}>{displayValue} <span>X</span></div>
  }
  )
}

export default CurrentFiltersRecap;