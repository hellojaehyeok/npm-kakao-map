
import { useState } from 'react';
import './App.css';
import KakaoMap from './lib/kakaomap.jsx';


function App() {
  const [mapType, setMapType] = useState("normal");
  const [isCadastral, setIsCadastral] = useState(false);
  const [mapLevel, setMapLevel] = useState(3);
  const [mapCenter, setMapCenter] = useState({
    lat:37.496,
    lng:127.029,
  });
  const [isMyLocation, setIsMyLocation] = useState(false);

  const [isMarker, setIsMarker] = useState(false);
  const [markerArr, setMarkerArr] = useState([
    {lat:37.499590, lng:127.026374},
    {lat:37.499427, lng:127.027947},
  ]);

  return (
    <div className="App">
      <button onClick={() => setMapType("normal")}>일반지도</button>
      <button onClick={() => setMapType("satellite")}>위성지도</button>
      <button onClick={() => setIsCadastral(!isCadastral)}>지적지도 토글</button>
      <button onClick={() => setMapLevel(mapLevel-1)}>줌인</button>
      <button onClick={() => setMapLevel(mapLevel+1)}>줌아웃</button>
      <button onClick={() => setIsMyLocation(!isMyLocation)}>내위치 토글</button>
      <button onClick={() => setIsMarker(!isMarker)}>마커 토글</button>

      

      <KakaoMap 
        mapType={mapType}
        isCadastral={isCadastral}
        mapLevel={mapLevel}
        mapCenter={mapCenter}
        isMyLocation={isMyLocation}
        markerArr={markerArr}
        isMarker={isMarker}
        onClickClusterer={e => console.log(e)}
      />


    </div>
  );
}

export default App;
