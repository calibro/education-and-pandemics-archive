import React from "react";
import "./CollectionView.sass";
import { useCollection } from "../utils/collection";
import ResourceExtendedInfo from "../components/ResourceExtendedInfo";
import { CSVLink } from "react-csv";
import * as Papa from "papaparse";
import collectionIconAdd from "../assets/collection-add.svg";

const CollectionView = () => {
  const [collection] = useCollection();

  const csvData = Papa.unparse(
    collection.map((item) => {
      return {
        Title: item.fields["Title ID"],
        Summary: item.fields["Summary (limit 500)"],
        URL: item.fields["URL"],
        Pandemic: item.fields["Pandemic_name"],
        Type: item.fields["Type_name"],
        Themes: item.fields["Themes_name"],
        Tags: item.fields["Tags_name"],
        Country: item.fields["Country_name"],
        Location: item.fields["Location_name"],
        Language: item.fields["Language_name"],
        Credits: item.fields["Language_name"],
        Created: item.fields["Production date"],
        Published: item.fields["Publishing date"],
        Contributor: item.fields["Contributor"],
        Attachments: item.fields["Attachments"].map((a) => a.url),
      };
    })
  );

  return (
    <div className="collection-view">
      <div className="collection-header">
        <h2 className="ms-auto">Items Collected</h2>
        <CSVLink
          data={csvData}
          filename={"ISCHE-collection.csv"}
          className="export-link ms-auto"
        >
          Export list
        </CSVLink>
      </div>
      <div className="collection-grid">
        {collection.map((resource) => (
          <ResourceExtendedInfo
            resource={resource}
            key={resource.id}
          ></ResourceExtendedInfo>
        ))}
      </div>
      {collection.length === 0 && (
        <div className="empty-collection">
          Your collections is empty.
          <br />
          Click on <img src={collectionIconAdd} alt="save"></img> to save items
          here.
        </div>
      )}
    </div>
  );
};

export default CollectionView;
