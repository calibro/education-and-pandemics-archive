import * as React from 'react';
import { useState, useMemo } from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import './ResourcesMap.sass';
import ResourcesGrid from './ResourcesGrid';
import CountriesMap from './maps/CountriesMap';
import LocationsMap from './maps/LocationsMap';

function ResourcesMap({archiveItems}) {

  const [mapType, setMapType] = useState('countries');
  const [filteredItems, setFilteredItems] = useState(archiveItems);

  //map.current && map.current.on('move', onMapMove)
  return (
    <div className="resource-map">
      <div className="map-container">
        {mapType == 'locations' && (
          <LocationsMap archiveItems={archiveItems} onUpdate={setFilteredItems}></LocationsMap>
        )}
        {mapType == 'countries' && (
          <CountriesMap archiveItems={archiveItems} onUpdate={setFilteredItems}></CountriesMap>
          )
        }
      </div>
      <div className="map-sidebar">
        <div className="map-options">
          Map view 
          <label>
            <input
              type="radio"
              name="map-type-option"
              value="countries"
              checked={mapType === 'countries'}
              onChange={() => setMapType('countries')}
              className="map-option-input"
            />
            COUNTRIES
          </label>
          <label>
            <input
              type="radio"
              name="map-type-option"
              value="locations"
              checked={mapType === 'locations'}
              onChange={() => setMapType('locations')}
              className="map-option-input"
            />
            LOCATIONS
          </label>
        </div>
        <div className="resource-list">
          <ResourcesGrid archiveItems={filteredItems}></ResourcesGrid>
        </div>
      </div>
    </div>
  )
}

export default ResourcesMap
