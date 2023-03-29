import { TileLayer, MapContainer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LocationMarker from './LocationMarker';
import axios from 'axios';
import { useEffect } from 'react';

L.Marker.prototype.options.icon = L.icon({
   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});

const center = { lat: 16.054407, lng: 108.202164 };

export default function Map() {
   //    interface Way {
   //       id: number;
   //       nodes: number[];
   //       tags: Record<string, string>;
   //       type: string;
   //    }

   //    interface Node {
   //       id: number;
   //       lat: number;
   //       lon: number;
   //       tags: Record<string, string>;
   //       type: string;
   //    }

   //    interface Relation {
   //       id: number;
   //       members: { type: 'way' | 'node' | 'relation'; ref: number; role: string }[];
   //       tags: Record<string, string>;
   //       type: string;
   //    }
   //    interface Address {
   //       lat: number;
   //       lon: number;
   //       tags: Record<string, string>;
   //    }

   //    interface OverpassResponse {
   //       elements: (Way | Node | Relation)[];
   //    }

   //    const getAddresses = async (district: string, street: string) => {
   //       const query = `[out:json]; area[name="Quảng Nam"]->.a; way(area.a)["addr:street"=""]["addr:housenumber"]->.w; node(w); out;`;

   //       const response = await axios.get<OverpassResponse>(
   //          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
   //       );

   //         const addresses = response.data.elements
   //            .filter((element): element is Way => element.type === 'way')
   //            .flatMap((way) => {
   //               const nodes = way.nodes
   //                  .map(
   //                     (nodeId) =>
   //                        response.data.elements.find(
   //                           (element) => element.type === 'node' && element.id === nodeId,
   //                        ) as Node | Relation,
   //                  )
   //                  .filter((node): node is Node => node !== undefined && 'members' in node);

   //               return nodes.map((node) => ({
   //                  lat: node.lat,
   //                  lon: node.lon,
   //                  tags: { ...way.tags, ...node.tags },
   //               }));
   //            });
   //         console.log(addresses);

   //       return response.data.elements;
   //    };

   //    useEffect(() => {
   //       const handleCall = async () => {
   //          const addresses = await getAddresses('Hải Châu', 'Trần Phú');
   //          console.log(addresses);
   //       };
   //       handleCall();
   //    }, []);

   return (
      <MapContainer style={{ height: '500px', width: '500px' }} center={center} zoom={13}>
         <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <LocationMarker />
         {/* <Marker position={[59.43046, 24.728563]}>
            <Popup>
               A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
         </Marker> */}
      </MapContainer>
   );
}
