declare namespace google.maps {
  interface LatLng {
    lat(): number;
    lng(): number;
    equals(other: LatLng | null): boolean;
    toString(): string;
    toUrlValue(precision?: number): string;
    toJSON(): { lat: number; lng: number };
  }

  interface LatLngBounds {
    contains(latLng: LatLng): boolean;
    equals(other: LatLngBounds | null): boolean;
    extend(latLng: LatLng): void;
    getCenter(): LatLng;
    getNorthEast(): LatLng;
    getSouthWest(): LatLng;
    isEmpty(): boolean;
    toJSON(): { north: number; south: number; east: number; west: number };
    toSpan(): LatLng;
    toString(): string;
    toUrlValue(precision?: number): string;
    union(other: LatLngBounds): LatLngBounds;
  }

  interface Map {
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    getCenter(): LatLng;
    getZoom(): number;
    setOptions(options: MapOptions): void;
    panTo(latLng: LatLng | LatLngLiteral): void;
    panBy(x: number, y: number): void;
    fitBounds(bounds: LatLngBounds): void;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    mapTypeId?: string;
    styles?: MapTypeStyle[];
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
  }

  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers: Record<string, string | number | boolean>[];
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface Marker {
    setMap(map: Map | null): void;
    setPosition(latLng: LatLng | LatLngLiteral): void;
    setTitle(title: string): void;
    setAnimation(animation: Animation | null): void;
    getPosition(): LatLng | null;
    addListener(
      eventName: string,
      handler: (event: unknown) => void,
    ): MapsEventListener;
  }

  interface MapsEventListener {
    remove(): void;
  }

  namespace places {
    interface AutocompletePrediction {
      description: string;
      matched_substrings: { length: number; offset: number }[];
      place_id: string;
      reference: string;
      structured_formatting: {
        main_text: string;
        main_text_matched_substrings: { length: number; offset: number }[];
        secondary_text: string;
      };
      terms: { offset: number; value: string }[];
      types: string[];
    }

    interface PlaceResult {
      geometry?: {
        location?: LatLng;
        viewport?: LatLngBounds;
      };
      name?: string;
      place_id?: string;
      formatted_address?: string;
    }

    interface AutocompleteOptions {
      bounds?: LatLngBounds;
      componentRestrictions?: { country: string | string[] };
      fields?: string[];
      strictBounds?: boolean;
      types?: string[];
    }

    interface Autocomplete {
      getPlace(): PlaceResult;
      setBounds(bounds: LatLngBounds): void;
      setComponentRestrictions(restrictions: { country: string | string[] }): void;
      setFields(fields: string[]): void;
      setOptions(options: AutocompleteOptions): void;
      setTypes(types: string[]): void;
      addListener(
        eventName: string,
        handler: (event: unknown) => void,
      ): MapsEventListener;
    }
  }

  interface LoaderOptions {
    id: string;
    googleMapsApiKey: string;
    libraries?: (
      | 'places'
      | 'drawing'
      | 'geometry'
      | 'localContext'
      | 'visualization'
      | 'marker'
    )[];
  }

  interface LoaderResult {
    isLoaded: boolean;
    loadError?: Error;
  }
}

declare module '@react-google-maps/api' {
  export interface GoogleMapProps {
    mapContainerStyle?: React.CSSProperties;
    center?: google.maps.LatLngLiteral;
    zoom?: number;
    options?: google.maps.MapOptions;
    onLoad?: (map: google.maps.Map) => void;
    onClick?: (event: google.maps.MapMouseEvent) => void;
  }

  export const GoogleMap: React.FC<GoogleMapProps>;
  export const Marker: React.FC<{
    position: google.maps.LatLngLiteral;
    onClick?: () => void;
  }>;
  export function useJsApiLoader(
    options: google.maps.LoaderOptions,
  ): google.maps.LoaderResult;
}
