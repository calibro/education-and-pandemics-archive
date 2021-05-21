import React, { useEffect, useState } from "react";
import "./CollectionView.sass";
import { useCollection } from "../utils/collection";
import ResourceExtendedInfo from "../components/ResourceExtendedInfo";
import { CSVLink } from "react-csv";
import * as Papa from "papaparse";
import collectionIconAdd from "../assets/collection-add.svg";

const CollectionView = () => {
  const [collection] = useCollection();

  const csvData = Papa.unparse(collection.map((item) => item.fields));

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
      {collection.length == 0 && (
        <div className="empty-collection">
          Your collections is empty.
          <br />
          Click on <img src={collectionIconAdd}></img> to save items here.
        </div>
      )}
    </div>
  );
};

export default CollectionView;
