## react-wrapper 更新 AdvancedMarkerElement

設定參數 `libraries` 為 `['marker']` 之後可使用 `window.google.maps.marker.AdvancedMarkerElement`。

```js
<Wrapper
  googleMapKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
  libraries={['marker']}
>
  <Map />
</Wrapper>
```

注意事項：

- 使用 `AdvancedMarkerElement`，Goggle `Map` 須使用 `mapId` 參數。
- 使用了 `mapId` 參數不支援舊版的 style 參數。[雲端式地圖樣式設定總覽](https://developers.google.com/maps/documentation/maps-static/cloud-customization?hl=zh-tw)

```js
const googleMap = new window.google.maps.Map(ref.current, {
  center,
  zoom,
  mapId: 'DEMO_MAP_ID',
});

const pinElement = new window.google.maps.marker.PinElement({
  glyph: POINT.name,
  glyphColor: '#0000ff',
});

new window.google.maps.marker.AdvancedMarkerElement({
  position: {
    lat: POINT.lat,
    lng: POINT.lng,
  },
  title: POINT.name,
  content: pinElement.element,
  map: googleMap,
});
```

### 參考資料

- [MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map?hl=zh-tw#MapOptions)
- [google.maps.marker.AdvancedMarkerElement](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers?hl=zh-tw#AdvancedMarkerElement)
- [PinElement](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers?hl=zh-tw#PinElement.background)
- [新專案建議使用 react-google-maps](https://github.com/visgl/react-google-maps)
- [AdvancedMarkerElement 改用進階標記官方教學](https://developers.google.com/maps/documentation/javascript/advanced-markers/migration?hl=zh-tw)
- [Google Maps JavaScript API React Wrapper](https://www.npmjs.com/package/@googlemaps/react-wrapper)
- [@googlemaps/js-api-loader](https://www.npmjs.com/package/@googlemaps/js-api-loader)
