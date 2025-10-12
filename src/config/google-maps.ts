const GOOGLE_MAPS_LIBRARIES = ['places', 'marker'] as (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
  | 'marker'
)[];

export const GOOGLE_MAPS_LOADER_CONFIG = {
  id: 'google-map-script',
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  libraries: GOOGLE_MAPS_LIBRARIES,
};
