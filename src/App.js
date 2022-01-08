
import { useEffect, useRef, useState } from 'react';
import KakaoMap from './lib/kakaomap.jsx';


function App() {
  // ----------------
  // 예시 및 테스트 코드입니다.
  // ----------------
  const roadViewRef = useRef(); 
  const roadBtnRef = useRef(); 

  // normal -> 일반 지도
  // satellite -> 위성지도
  const [mapType, setMapType] = useState("normal");
  
  // 오버레이 지도 타입
  const [overlayMapType, setOverlayMapType] = useState(null);

  // 지도 레벨
  const [mapLevel, setMapLevel] = useState(3);

  // 지도 중점
  const [mapCenter, setMapCenter] = useState({lat:37.498, lng:127.028});

  // 현재 위치
  const [isMyLocation, setIsMyLocation] = useState(true);

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

  const [isRoadView, setIsRoadView] = useState(false);

  // 클러스터러 옵션
  const clustererOption = {
    disableClickZoom:true,
    onClickCenter:(e) => {console.log(e)},
    minLevel:2,
  }

  
  return (
    <div style={{width:"100vw", height:"100vh"}}>
      <KakaoMap 
        mapType={mapType}
        overlayMapType={overlayMapType}
        mapLevel={mapLevel}
        mapCenter={mapCenter}
        isMyLocation={isMyLocation}
        makerOption={makerOption}
        isMarker={isMarker}
        clustererOption={clustererOption}
        
        roadViewRef={roadViewRef}
        roadBtnRef={roadBtnRef}
        isRoadView={isRoadView}
      />

      <div style={{
        position:"absolute",
        bottom:"400px",
        left:"22px",
        width:"300px",
        height:"300px",
        zIndex: 99,
        }} ref={roadViewRef}></div>

    <div onClick={() => setIsRoadView(!isRoadView)} ref={roadBtnRef} style={{
      position:"absolute",
      zIndex: 99,
      backgroundColor:"salmon",
      top:0,
    }}>로드뷰</div>



    </div>
  );
}

export default App;
