import { useState, memo } from "react";

import MapOverlay from "./MapOverlay";
import MapCard from "./MapCard";
import MapButton from "./MapButton";

const MapMarker = ({ map, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    console.log("handleToggle", isOpen);
    setIsOpen((prev) => !prev);
  };

  return (
    map && (
      <MapOverlay
        map={map}
        position={{
          lat: data.lat,
          lng: data.lon,
        }}
      >
        <div
          className="flex flex-col relative justify-center items-center"
          onTouchStart={(e) => {
            // Avoid click event on Google Map.
            e.stopPropagation();
          }}
          onClick={(e) => {
            // Avoid click event on Google Map.
            // e.stopPropagation();
          }}
        >
          {isOpen && <MapCard data={data} />}
          <MapButton onClick={handleToggle}>{data.name}</MapButton>
        </div>
      </MapOverlay>
    )
  );
};

export default memo(MapMarker);
