export interface MapCoordinatet {
    lat: number;
    lng: number;
}

export interface Marker {
    position: MapCoordinatet;
    content: string;
}

export type Place = {
    placeName: string;
} & MapCoordinatet;
