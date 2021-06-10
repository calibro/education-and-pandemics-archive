import { useQueryParam, ArrayParam } from "use-query-params";
import moment from "moment";

const CurrentFiltersRecap = ({ filterKey, filters }) => {
  const [params, setFilterValue] = useQueryParam(filterKey, ArrayParam);

  const paramsArray = params || [];

  const onRemove = (value) => {
    if (paramsArray.includes(value)) {
      paramsArray.splice(paramsArray.indexOf(value), 1);
    }
    setFilterValue(paramsArray);
  };

  return paramsArray.map((value) => {
    let displayValue = value;
    if (filterKey.indexOf("date") >= 0 && moment(+value).isValid()) {
      displayValue = moment(+value).format("MM/YYYY");
    }
    if (filterKey.indexOf("_id") >= 0) {
      let key = filterKey.replace("_id", "").toLowerCase()
      let item = filters[key] && filters[key].find(e => e.id == value)
      if (item) {
        displayValue = item.fields['Label']
      }else {
        displayValue = ''
      }
    }
    return (
      <span
        className="badge rounded-pill filter-recap-item text-body me-2 mb-3"
        onClick={() => onRemove(value)}
      >
        {displayValue} <span>x</span>
      </span>
    );
  });
};

export default CurrentFiltersRecap;
