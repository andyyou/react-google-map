import { useRef, useEffect, useState } from "react";

import MapMarker from "./MapMarker";

import { BUILDINGS } from "@/constaints";

const DEFAULT_MAP_CENTER = {
  lat: 25.05807,
  lng: 121.53748,
};
const DEFAULT_MAP_ZOOM = 15;

const Map = () => {
  const ref = useRef(null);
  const [center, setCenter] = useState(DEFAULT_MAP_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_MAP_ZOOM);
  const [map, setMap] = useState(null);

  // You can extract functions out of the component as props.
  const onClick = (e) => {};
  const onDrag = (e) => {};
  const onBoundsChanged = (googleMap) => {
    // const bounds = map.getBounds();
    // const ne = bounds.getNorthEast();
    // const sw = bounds.getSouthWest();
  };
  const onCenterChanged = (googleMap) => {};

  useEffect(() => {
    if (ref.current && !map) {
      const googleMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        disableDefaultUI: true,
        clickableIcons: false,
        disableDoubleClickZoom: true,
        gestureHandling: "greedy",
      });

      googleMap.addListener("click", onClick);
      googleMap.addListener("drag", onDrag);
      googleMap.addListener("bounds_changed", () => onBoundsChanged(googleMap));
      googleMap.addListener("center_changed", () => onCenterChanged(googleMap));

      setMap(googleMap);
    }
  }, [center, zoom, map]);

  return (
    <>
      <div id="map" ref={ref} className="w-full h-full"></div>
      {map &&
        BUILDINGS.map((building) => {
          return <MapMarker map={map} data={building} key={building.id} />;
        })}
    </>
  );
};

export default Map;
