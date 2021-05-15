import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';

import ReactMapGL, {Source, Layer} from 'react-map-gl';
import _ from "lodash";
import {clusterLayer, clusterCountLayer, unclusteredPointLayer, ghostPoints} from './layers';

function makeLocationsGeoJSON(items) {
  return {
    type: 'FeatureCollection',
    features: items.map(item => {
      return {
        type: 'Feature',
        properties: {
          id: item.id,
          type: 'resource'
        },
        geometry: {type: 'Point', coordinates: [item.fields['Location_long'][0], item.fields['Location_lat'][0]]}}
    })
  }
}

function LocationsMap({archiveItems, onUpdate}) {
  let map =  React.createRef();

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    zoom: 1
  });
  debugger

  const itemsWithLocation = archiveItems.filter(i => i.fields['Location'] && i.fields['Location_long'] && i.fields['Location_lat'])
  useEffect(() => {
    onUpdate(itemsWithLocation)
  }, []);

  const onMapMove = event => {
    if(map.current){
      var features =  map.current.queryRenderedFeatures()
      let visibleResIds = features.filter(f=> f.layer.id == ghostPoints.id).map(f => f.properties.id)
      onUpdate(itemsWithLocation.filter(i => visibleResIds.includes(i.id)))
    }
  }

  const locationsGeoJSON = useMemo(() => makeLocationsGeoJSON(itemsWithLocation), itemsWithLocation)

  //map.current && map.current.on('move', onMapMove)
  return (
        <ReactMapGL
          ref={map}
          {...viewport}
          onTransitionEnd={onMapMove}
          onViewportChange={nextViewport => setViewport(nextViewport)}
          interactiveLayerIds={[ghostPoints.id]}
        >
          <Source id="locations-cluster" type="geojson"
              data={locationsGeoJSON}
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
            >
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
            <Source id="locations" type="geojson"
              data={locationsGeoJSON}>
              <Layer {...ghostPoints} />
            </Source>
        </ReactMapGL>
  )
}

export default LocationsMap
