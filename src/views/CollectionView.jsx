import React, { useEffect, useState } from "react";
import './CollectionView.sass';
import {useCollection} from '../utils/collection'
import ResourceExtendedInfo from '../components/ResourceExtendedInfo'
import { CSVLink } from "react-csv";
import * as Papa from 'papaparse'

const CollectionView = () => {
  const [collection] = useCollection()

  const csvData = Papa.unparse(collection.map(item => item.fields))

  return (
    <div className="collection-view">
      <div className="collection-header">
        <h2>Items Collected</h2>
        <CSVLink data={csvData} filename={"ISCHE-collection.csv"} className="export-link">Export list</CSVLink>
      </div>
      <div className="collection-grid">
      {
        collection.map(resource =>
          <ResourceExtendedInfo resource={resource}></ResourceExtendedInfo>
        )
      }
      </div>
    </div>
  )
}

export default CollectionView