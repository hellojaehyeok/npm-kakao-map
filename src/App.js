
import { useEffect, useState } from 'react';
import './App.css';
import KakaoMap from './lib/kakaomap.jsx';


function App() {
  
  // normal -> 일반 지도
  // satellite -> 위성지도
  const [mapType, setMapType] = useState("normal");
  
  // 지적지도 bool 
  const [isCadastral, setIsCadastral] = useState(false);

  // 지도 레벨
  const [mapLevel, setMapLevel] = useState(3);

  // 지도 중점
  const [mapCenter, setMapCenter] = useState({lat:37.496, lng:127.029});

  // 현재 위치
  const [isMyLocation, setIsMyLocation] = useState(false);

  // 마커 토글, 마커 위치
  const [makerOption, setMakerOption] = useState({
    makerImg:{
      src:null,
      width:0,
      height:0,
    },
    posArr : [
      {lat:37.499, lng:127.026},
      {lat:37.499, lng:127.027},
    ]
  })
  const [isMarker, setIsMarker] = useState(true);

  // 클러스터러 옵션
  const clustererOption = {
    disableClickZoom:true,
    onClickCenter:(e) => {console.log(e)},
    minLevel:2,
  }


  return (
    <div className="App">
      <button onClick={() => setIsMyLocation(!isMyLocation)}>내위치 토글</button>
      <button onClick={() => setIsMarker(!isMarker)}>마커 토글</button>

      <KakaoMap 
        mapType={mapType}
        isCadastral={isCadastral}
        mapLevel={mapLevel}
        mapCenter={mapCenter}
        isMyLocation={isMyLocation}
        makerOption={makerOption}
        isMarker={isMarker}
        clustererOption={clustererOption}
      />


    </div>
  );
}

export default App;
