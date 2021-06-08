import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import _ from "lodash";
import { countriesLayer } from "./layers";
import countries from "../../assets/geojson/countries.geo.json";

countries.features.forEach((d) => {
  d.id = d.properties.ISO_A3;
});

function makeCountrGeoJSON(items) {
  const countriesWithData = _.uniq(items.map((i) => i.fields["Country_a3"][0]));
  let geojson = {
    ...countries,
    features: countries.features.filter((f) =>
      countriesWithData.includes(f.id)
    ),
  };
  let maxItems = _.max(
    countriesWithData.map(
      (c) => items.filter((i) => i.fields["Country_a3"] == c).length
    )
  );
  geojson.features.forEach((f) => {
    f.properties.intensity =
      items.filter((i) => i.fields["Country_a3"] == f.id).length / maxItems;
    f.properties.id = f.id;
  });
  return geojson;
}

function CountriesMap({ archiveItems, onUpdate }) {
  let map = React.createRef();

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 1,
  });

  const itemsWithCountry = archiveItems.filter((i) => i.fields["Country"]);
  useEffect(() => {
    onUpdate(itemsWithCountry);
  }, []);

  const onMapMove = (event) => {
    if (map.current) {
      var features = map.current.queryRenderedFeatures();
      var visibleCountryIds = features
        .map((f) => f.properties.id)
        .filter((f) => f);
      onUpdate(
        itemsWithCountry.filter((i) =>
          visibleCountryIds.includes(i.fields["Country_a3"][0])
        )
      );
    }
  };

  const countriesGeoJSON = useMemo(
    () => makeCountrGeoJSON(itemsWithCountry),
    itemsWithCountry
  );

  return (
    <ReactMapGL
      ref={map}
      {...viewport}
      onTransitionEnd={onMapMove}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      interactiveLayerIds={[countriesLayer.id]}
    >
      <Source id="countries" type="geojson" data={countriesGeoJSON}>
        <Layer {...countriesLayer} />
      </Source>
    </ReactMapGL>
  );
}

export default CountriesMap;
