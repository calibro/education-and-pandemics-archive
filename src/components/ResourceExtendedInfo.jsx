import "./ResourceExtendedInfo.sass";
import { useCollection } from "../utils/collection";
import moment from "moment";
import AnimatedLink from "./commons/AnimatedLink";
import ReactTooltip from "react-tooltip";

import collectionIconAdd from "../assets/collection-add.svg";
import collectionIconSaved from "../assets/collection-active.svg";

let formatData = (value, granularity) => {
  let d = moment(value, "YYYY-MM-DD");
  switch (granularity) {
    case "day":
      return d.format("DD/MM/YYYY");
    case "month":
      return d.format("MM/YYYY");
    case "year":
      return d.format("YYYY");
    default:
      return d.format("DD/MM/YYYY");
  }
};

const ResourceExtendedInfo = ({ resource }) => {
  let infoFields = [
    {
      field: "Pandemic_name",
      label: "Pandemic",
    },
    {
      field: "Type_name",
      label: "Type",
    },
    {
      field: "Themes_name",
      label: "Themes",
    },
    {
      field: "Tags_name",
      label: "Tags",
    },
    {
      field: "Country_name",
      label: "Country",
    },
    {
      field: "Location_name",
      label: "Location",
    },
    {
      field: "Language_name",
      label: "Language",
    },
    {
      field: "Credits",
      label: "Credits",
    },
    {
      field: "Production date",
      label: "Created",
      format: (v, fields) =>
        v ? formatData(v, fields["Granularity production date"]) : "",
    },
    {
      field: "Publishing date",
      label: "Published",
      format: (v, fields) =>
        v ? formatData(v, fields["Granularity publishing date"]) : "",
    },
    {
      field: "Added in the archive (YYYY-MM-DD)",
      label: "Archived",
      format: (v, fields) => (v ? formatData(v, "day") : ""),
    },
    {
      field: "Contributor",
      label: "Contributor",
    },
  ];

  const CollectionAction = () => {
    const [collection, setCollection] = useCollection();

    const toggleFromCollection = () => {
      setCollection((c) => {
        let collectionCopy = JSON.parse(JSON.stringify(c));

        if (collectionCopy.find((item) => item.id == resource.id)) {
          collectionCopy.splice(
            collectionCopy.findIndex((item) => item.id == resource.id),
            1
          );
        } else {
          collectionCopy.push({
            id: resource.id,
            fields: resource.fields,
          });
        }
        return collectionCopy;
      });
    };
    const isInCollection = collection.find((item) => item.id === resource.id);
    return (
      <div
        className="collection-icon"
        onClick={toggleFromCollection}
        data-tip={isInCollection ? "Remove item" : "Save item"}
        style={{
          backgroundImage: !isInCollection
            ? `url(${collectionIconAdd})`
            : `url(${collectionIconSaved})`,
        }}
      >
        <ReactTooltip effect="solid" />
      </div>
    );
  };
  return (
    <div className="resource-extended-info">
      <div className="resource-title">
        {resource.fields["Title ID"]}
        <CollectionAction />
      </div>
      <div className="resource-desc">
        {resource.fields["Summary (limit 500)"]}
      </div>
      <div className="resource-metadata">
        {infoFields.map((info) => {
          return (
            <div className="meta-row" key={info.field}>
              <div className="meta-title">{info.label}</div>
              <div className="meta-value">
                {info.format
                  ? info.format(resource.fields[info.field], resource.fields)
                  : Array.isArray(resource.fields[info.field])
                  ? resource.fields[info.field].join(", ")
                  : resource.fields[info.field] || "/"}
              </div>
            </div>
          );
        })}
      </div>
      {resource.fields["URL"] && (
        <a
          className="resource-source"
          href={resource.fields["URL"]}
          target="_blank"
          rel="noreferrer"
        >
          <AnimatedLink text="GO TO SOURCE"></AnimatedLink>
        </a>
      )}
    </div>
  );
};

export default ResourceExtendedInfo;
