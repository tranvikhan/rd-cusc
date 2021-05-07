import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

const Map = (props) => {
  return (
    <MapContainer
      center={[10.033913498761292, 105.77987359669524]}
      zoom={18}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidHJhbnZpa2hhbiIsImEiOiJja29kbGp6djEwM212MnZuM2Z3cnZ5MzhqIn0.z9V8bF5QoUkK36axoD1siQ`}
      />
      <Marker
        position={[10.033913498761292, 105.77987359669524]}
        draggable={false}
        animate={true}
      >
        <Popup>{props.popupText}</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
