import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel")

const Map = props => {
  const { longitude, latitude } = props
  const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
      defaultCenter={{ lat: latitude, lng: longitude }}
      defaultZoom={13}
    ><MarkerWithLabel
      position={{ lat: latitude, lng: longitude }}
      labelAnchor={new google.maps.Point(0, 0)}
      labelStyle={{}}
    >
        <div></div>
      </MarkerWithLabel>

    </GoogleMap>
  ));
  return (
    <div>
      <GoogleMapExample
        containerElement={<div style={{ height: `200px`, width: '600px' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};
export default Map;