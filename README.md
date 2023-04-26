# Google Map, Clusters, for React

## 介紹

本範例嘗試使用 Google 官方的 React Wrapper 函式庫實作 Google Map 功能，目標為自訂 MapOverView 達成在 Map 上加入複雜的 Marker。
例如像 Airbnb 點擊房源時可以展開。這個範例我們會支援 [Marker Clustering](https://developers.google.com/maps/documentation/javascript/marker-clustering)

## 建立專案

```sh
$ npx create-next-app demo
$ cd demo

# 安裝相依套件
$ npm i @googlemaps/react-wrapper @googlemaps/markerclusterer

# OR

$ git clone
```

## 取得 Google Map 金鑰

參考 [Google 官方教學](https://developers.google.com/maps/documentation/javascript/get-api-key) 取得金鑰。

## 抽取負責顯示地圖的容器元件

```sh
$ mkdir components
$ touch components/MapContainer
```

```js
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./Map";

const render = (status) => {
  switch (status) {
    case Status.FAILURE:
      return <div>Error</div>;
  }
  return <div>Loading...</div>;
};

const MapContainer = () => {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
      render={render}
    >
      <Map />
    </Wrapper>
  );
};

export default MapContainer;
```
