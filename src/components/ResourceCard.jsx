import './ResourceCard.sass';
import { useHistory } from "react-router-dom";

import docPlaceholder from '../assets/resource-placeholder-doc.svg';

const ResourceCard = ({item, flick}) => {

  const history = useHistory();

  function handleClick() {
    if(!flick || !flick.current.isPlaying()) {
      history.push("/explore/resource/" + item.id);
    }
  }
  
  const resourceImage = item.fields.Attachments && item.fields.Attachments.length > 0 ? item.fields.Attachments[0].thumbnails.large.url : docPlaceholder

  return (
    <div onClick={handleClick} className="resource-card">
        <div className="thumb" style={{backgroundImage: `url(${resourceImage})`}}></div>
        <div className="card-title">
          <div className="title-text">{item.fields['Title ID']}</div>
          <div className="title-underline"><span>{item.fields['Title ID']}</span></div>
        </div>

        {item.fields.Pandemic_name && (
            <div className="card-badge">{item.fields.Pandemic_name.join(',')}</div>
        )}
    </div>
  )
}

export default ResourceCard