import './ResourceCard.sass';
import { useHistory } from "react-router-dom";

const ResourceCard = ({item}) => {

  const history = useHistory();

  function handleClick() {
    history.push("/resource/" + item.id);
  }

  return (
    <div onClick={handleClick} className="resource-card">
        {(item.fields.Attachments && item.fields.Attachments.length > 0)
          && <img src={item.fields.Attachments[0].url} alt={item.fields['Title ID']}/>}
        <div className="card-title">{item.fields['Title ID']}</div>

        {item.fields.Pandemic_name && (
            <div className="card-badge">{item.fields.Pandemic_name.join(',')}</div>
        )}
    </div>
  )
}

export default ResourceCard