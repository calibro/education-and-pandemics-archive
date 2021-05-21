import * as React from "react";
import { useState, useMemo } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import "./ResourcesMap.sass";
import ResourcesGrid from "./ResourcesGrid";
import CountriesMap from "./maps/CountriesMap";
import LocationsMap from "./maps/LocationsMap";

function ResourcesMap({ archiveItems }) {
  const [mapType, setMapType] = useState("countries");
  const [filteredItems, setFilteredItems] = useState(archiveItems);

  //map.current && map.current.on('move', onMapMove)
  return (
    <div className="resource-map d-flex position-relative overflow-hidden flex-grow-1 flex-shrink-1 border-top border-dark">
      <div className="row g-0 w-100">
        <div className="col-12 col-md-8 map-container">
          {mapType == "locations" && (
            <LocationsMap
              archiveItems={archiveItems}
              onUpdate={setFilteredItems}
            ></LocationsMap>
          )}
          {mapType == "countries" && (
            <CountriesMap
              archiveItems={archiveItems}
              onUpdate={setFilteredItems}
            ></CountriesMap>
          )}
        </div>

        <div className="col-12 col-md-4 map-sidebar d-flex flex-column">
          <div className="map-options p-3 shadow flex-grow-0 flex-shrink-0">
            Map view
            <label>
              <input
                type="radio"
                name="map-type-option1"
                value="countries"
                checked={mapType === "countries"}
                onChange={() => setMapType("countries")}
                className="form-check-input ms-2 me-1"
              />
              COUNTRIES
            </label>
            <label>
              <input
                type="radio"
                name="map-type-option2"
                value="locations"
                checked={mapType === "locations"}
                onChange={() => setMapType("locations")}
                className="form-check-input ms-2 me-1"
              />
              LOCATIONS
            </label>
          </div>
          <div className="resource-list h-100 overflow-auto flex-grow-1 flex-shrink-1">
            <ResourcesGrid archiveItems={filteredItems}></ResourcesGrid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcesMap;
