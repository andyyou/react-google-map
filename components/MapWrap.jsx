import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./Map";

const render = (status) => {
  switch (status) {
    case Status.FAILURE:
      return <div>Error</div>;
  }
  return <div>Loading...</div>;
};

const MapWrap = () => {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
      render={render}
    >
      <Map />
    </Wrapper>
  );
};

export default MapWrap;
