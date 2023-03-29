import { LatLng } from 'leaflet';
import React, { useState } from 'react';
import { Marker, useMapEvents, Popup } from 'react-leaflet';

const LocationMarker = () => {
   const [position, setPosition] = useState<LatLng | null>(null);
   const map = useMapEvents({
      click() {
         map.locate();
      },
      locationfound(e) {
         setPosition(e.latlng);
         map.flyTo(e.latlng, map.getZoom());
      },
   });

   return position === null ? null : (
      <Marker position={position}>
         <Popup>You are here</Popup>
      </Marker>
   );
};

export default LocationMarker;
