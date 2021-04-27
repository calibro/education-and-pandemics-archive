import * as React from 'react';
import { useState, useMemo } from 'react';
import ReactMapGL, {Source, Layer} from '!react-map-gl';
import _ from "lodash";
import {countriesLayer} from './layers';
import countries from '../../assets/geojson/countries.geo.json'

function makeCountrGeoJSON(items) {
  const countriesWithData = _.uniq(items.map(i => i.fields['Country_a3'][0]))
  return {
    ...countries,
    features: countries.features.filter(f => countriesWithData.includes(f.id))
  }
}


function CountriesMap({archiveItems, onUpdate}) {
  let map =  React.createRef();

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    zoom: 1
  });

  const itemsWithCountry = archiveItems.filter(i => i.fields['Country'])
  
  const onMapMove = event => {
    if(map.current){
      var features =  map.current.queryRenderedFeatures()
      let visibleCountryIds = features.filter(f=> f.layer.id == countriesLayer.id).map(f => f.id)
      //TO FIX
      onUpdate(itemsWithCountry.filter(i => visibleCountryIds.includes(i.fields['Country_a3'][0])))
    }
  }

  const countriesGeoJSON = useMemo(() => makeCountrGeoJSON(itemsWithCountry), itemsWithCountry)

  return <ReactMapGL
            ref={map}
            {...viewport}
            onTransitionEnd={onMapMove}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            interactiveLayerIds={[countriesLayer.id]}
          >
            <Source id="countries" type="geojson"
              data={countriesGeoJSON}>
              <Layer {...countriesLayer} />
            </Source>
        </ReactMapGL>
}

export default CountriesMap
