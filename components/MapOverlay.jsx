import { useMemo, useEffect, memo } from "react";
import { createPortal } from "react-dom";

/**
 *
 * @param props { element: HTMLElement, position: { lat: number, lng: number }
 * @returns {MapOverlayView}
 */
export const createMapOverlayViewInstance = (props) => {
  class MapOverlayView extends window.google.maps.OverlayView {
    element = null;
    position = null;

    constructor(element, position) {
      super();
      this.element = element;
      this.position = position;
    }

    getPosition() {
      return new window.google.maps.LatLng(
        this.position.lat,
        this.position.lng
      );
    }

    getVisible() {
      return true;
    }

    onAdd() {
      this.getPanes().floatPane.appendChild(this.element);
    }

    onRemove() {
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    }

    draw() {
      const projection = this.getProjection();
      const position = this.getPosition();
      const point = projection.fromLatLngToDivPixel(position);

      if (!point) {
        return;
      }

      // this.element.style.transform = `translate(${point.x}px, ${point.y}px)`;
      this.element.style.left = `${point.x}px`;
      this.element.style.top = `${point.y}px`;
    }
  }

  return new MapOverlayView(props.element, props.position);
};

/**
 * 方便我們使用 React 元件的方式建立 OverlayView
 * @param props { map: google.maps.Map, position: { lat: number, lng: number }, zIndex: number, children: React.ReactNode }
 * @returns {JSX.Element}
 */
const MapOverlayView = ({ map, cluster, position, zIndex, children }) => {
  const element = useMemo(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    return div;
  }, []);

  const overlay = useMemo(() => {
    return createMapOverlayViewInstance({ element, position });
  }, [element, position]);

  useEffect(() => {
    overlay?.setMap(map);

    return () => {
      cluster?.removeMarker(overlay);
      overlay?.setMap(null);
    };
  }, [overlay, map, cluster]);

  useEffect(() => {
    cluster?.addMarker(overlay);
    return () => {
      cluster?.removeMarker(overlay);
    };
  }, [cluster, overlay]);

  useEffect(() => {
    element.style.zIndex = `${zIndex}`;
  }, [element, zIndex]);

  return createPortal(children, element);
};

export default memo(MapOverlayView);
