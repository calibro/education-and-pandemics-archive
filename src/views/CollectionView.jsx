import React, { useEffect, useState } from "react";
import './CollectionView.sass';
import {useCollection} from '../utils/collection'
import ResourceExtendedInfo from '../components/ResourceExtendedInfo'

const CollectionView = () => {
  const [collection] = useCollection()

  return (
    <div className="collection-view">
      <h2>Items Collected</h2>
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