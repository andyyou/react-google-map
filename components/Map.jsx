import { useRef, useEffect } from "react";

const Map = () => {
  const ref = useRef(null);
  const center = {
    lat: 35.681236,
    lng: 139.767125,
  };

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom: 15,
    });
    new window.google.maps.Marker({
      position: center,
      map,
      title: "Hello World!",
    });
  });

  return <div id="map" ref={ref} className="w-full h-full"></div>;
};

export default Map;
