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

  let title = item.fields['Title ID']
  if(title.length > 60) {
    title = title.substring(0, 57) + ' (...)'
  }

  let pandemics = item.fields.Pandemic_name ? item.fields.Pandemic_name.join(',') : ''
  if(pandemics.length > 30) {
    pandemics = pandemics.substring(0, 27) + ' (...)'
  }

  return (
    <div onClick={handleClick} className="resource-card">
        <div className="thumb" style={{backgroundImage: `url(${resourceImage})`}}></div>
        <div className="card-title">
          <div className="title-text">{title}</div>
          <div className="title-underline"><span>{title}</span></div>
        </div>

        <div className="card-badge">{pandemics}</div>
    </div>
  )
}

export default ResourceCard