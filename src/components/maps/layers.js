export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'locations-cluster',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': '#B87333',
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
  }
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'locations-cluster',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
  paint: {
    "text-color": "#ffffff"
  }
};

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'locations-cluster',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#B87333',
    'circle-radius': 10
  }
};

export const ghostPoints = {
  id: 'ghost-points',
  type: 'circle',
  source: 'locations',
  paint: {
    'circle-color': '#B87333',
    'circle-radius': 0
  }
};

export const countriesLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': '#B87333',
    'fill-opacity': {
      property: 'intensity',
      stops: [
        [0, 0.2],
        [1, 0.95]
      ]
    },
  }
};