import "./ResourceCard.sass";
import { useHistory } from "react-router-dom";

import docPlaceholder from "../assets/resource-placeholder-doc.svg";

const ResourceCard = ({ item, flick }) => {
  const history = useHistory();

  function handleClick() {
    if (!flick || !flick.current.isPlaying()) {
      history.push("/explore/resource/" + item.id);
    }
  }

  const resourceImage =
    item.fields.Attachments && item.fields.Attachments.length > 0
      ? item.fields.Attachments[0].thumbnails.large.url
      : docPlaceholder;

  let title = item.fields["Title ID"];
  // if (title.length > 60) {
  //   title = title.substring(0, 57) + " (...)";
  // }

  let pandemics = item.fields.Pandemic_name
    ? item.fields.Pandemic_name.join(",")
    : "";
  // if (pandemics.length > 30) {
  //   pandemics = pandemics.substring(0, 27) + " (...)";
  // }

  return (
    <div
      className="resource-card d-flex flex-column p-2 overflow-hidden"
      onClick={handleClick}
    >
      <img
        src={resourceImage}
        className="resource-card-img h-50 mb-3"
        alt="preview"
      />
      <div className="resource-card-body flex-grow-1 flex-shrink-1 position-relative">
        <h3 className="resource-card-title fs-5">{title}</h3>
        <div className="fs-5 title-underline">
          <span>{title}</span>
        </div>
      </div>
      <div className="resource-card-footer mt-auto flex-grow-0 flex-shrink-0">
        <div className="text-truncate d-block">{pandemics}</div>
      </div>
    </div>
  );
};

export default ResourceCard;
