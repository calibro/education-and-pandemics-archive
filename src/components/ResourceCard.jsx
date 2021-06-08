import "./ResourceCard.sass";
import { useHistory } from "react-router-dom";

import docPlaceholder from "../assets/resource-placeholder-doc.svg";
import audioPlaceholder from "../assets/resource-placeholder-audio.svg";
import webPlaceholder from "../assets/resource-placeholder-web.svg";

const ResourceCard = ({ item, flick, fixedWidth, tagField }) => {
  const history = useHistory();

  function handleClick() {
    if (!flick || !flick.current.isPlaying()) {
      history.push("/explore/resource/" + item.id);
    }
  }

  let resourceImage;
  if (item.fields.Attachments && item.fields.Attachments.length > 0) {
    resourceImage = item.fields.Attachments[0].thumbnails.large.url;
  } else {
    if (item.fields.Type_name && item.fields.Type_name.length > 0) {
      switch (item.fields.Type_name[0]) {
        case "Website":
          resourceImage = webPlaceholder;
          break;
        case "Podcast":
          resourceImage = audioPlaceholder;
          break;
        // Here we can add more doc placeholer if available
        default:
          resourceImage = docPlaceholder;
      }
    } else {
      resourceImage = docPlaceholder;
    }
  }

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
  let tag = tagField && item.fields[tagField];
  return (
    <div
      className="resource-card d-flex flex-column p-2 overflow-hidden"
      style={{ width: fixedWidth ? 235 : "auto" }}
      onClick={handleClick}
    >
      {tag && (
        <div className="resource-tag badge rounded-pill text-body me-2 mb-3">
          {tag}
        </div>
      )}
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
