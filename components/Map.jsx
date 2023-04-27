import { useRef, useEffect, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

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
  const [cluster, setCluster] = useState(null);

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
    if (ref.current && !map && !cluster) {
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

      const googleMarkerCluster = new MarkerClusterer({
        map: googleMap,
        renderer: {
          render: ({ count, position }) => {
            const svg = `
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke="black" stroke-width="2" fill="white" />
                <text x="20" y="24" font-size="14px" font-weight="bold" text-anchor="middle" fill="black">${count}</text>
              </svg>
            `;

            const url =
              "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);

            const icon = {
              url: url,
              size: new google.maps.Size(40, 40),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(20, 20),
              scaledSize: new google.maps.Size(40, 40),
            };

            return new google.maps.Marker({
              position: position,
              icon: icon,
            });
          },
        },
      });
      setMap(googleMap);
      setCluster(googleMarkerCluster);
    }
  }, [center, zoom, map, cluster]);

  return (
    <>
      <div id="map" ref={ref} className="w-full h-full"></div>
      {map &&
        BUILDINGS.map((building) => {
          return (
            <MapMarker
              map={map}
              cluster={cluster}
              data={building}
              key={building.id}
            />
          );
        })}
    </>
  );
};

export default Map;
