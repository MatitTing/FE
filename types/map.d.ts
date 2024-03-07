interface MapCoordinatet {
  lat: number;
  lng: number;
}

interface Marker {
  position: MapCoordinatet;
  content: string;
}

type place = {
  placeName: string;
} & MapCoordinatet;
