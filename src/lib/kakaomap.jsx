import React, { useEffect, useRef, useState } from 'react';
import './kakaomap.css';
// import styled from "styled-components"

// import redMarker from '../img/redMarker.png';

const { kakao } = window;

const KakaoMap = ({mapType, isCadastral, mapLevel,mapCenter, isMyLocation, markerArr, isMarker, clustererOption}) => {
    const container = useRef(); // 맵을 담을 ref 입니다.
    const [kakaoMap, setKakaoMap] = useState(null); // 카카오맵을 전역에서 쓸수있도록 만든 변수입니다.
    const [, setClusterer] = useState(); // 마커를 담는 클러스터러입니다. 

    const [, setMyClusterer] = useState(); // 내 위치토글을 위해 만든 클러스터러입니다.

    // 로드뷰를 위해 만든 변수들입니다.
    const rvWrapperRef = useRef();
    const roadViewRef = useRef();
    const roadBtnRef = useRef();
    const [, setRoadClusterer] = useState();
    const [isRoadView, setIsRoadView] = useState(false);

    // 맵을 생성합니다.
    useEffect(() => {
        const options = {
            center : new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
            level: mapLevel  // 처음 줌 거리 낮을수록 줌인
        };
        const map = new kakao.maps.Map(container.current, options); 
        setKakaoMap(map);
    }, [container]);
    
    useEffect(() => {
        if(!kakaoMap){return}
        if(isMarker){toggleMarker()}
    }, [kakaoMap])

    // (좌표값이 들어있는배열, 클러스터러, 마커이미지, 클러스터러이미지)
    const addMarkClust = (array, setClusterer, markerImg) => {
        if(array.length == 0){console.error("No marker array"); return;}

        var imageSize = new kakao.maps.Size(20, 30),
            imageOption = {offset: new kakao.maps.Point(4, 4)};
        var markerImage = markerImg?new kakao.maps.MarkerImage(markerImg, imageSize, imageOption):null;
    
        let markers = [];
        array.map(item => {
            markers.push(
                new kakao.maps.Marker({
                    map: kakaoMap, 
                    position: new kakao.maps.LatLng(item.lat, item.lng),
                    image: markerImage 
                })
            );
        })

        var clusterer = new kakao.maps.MarkerClusterer({
            map: kakaoMap,  
            averageCenter: true, 
            minLevel: clustererOption.minLevel,  
            disableClickZoom: clustererOption.disableClickZoom,  
        });

        clusterer.addMarkers(markers);
    
        kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
            clustererOption.onClickCenter({
                lat:cluster._center.toLatLng().Ma,
                lng:cluster._center.toLatLng().La
            })
        });
        setClusterer(clusterer);
    }



    // 로드맵 토글
    const onClickRoad = () => {
        if(!isRoadView){
            var rv = new kakao.maps.Roadview(roadViewRef.current); 
            var rvClient = new kakao.maps.RoadviewClient();

            var markImage = new kakao.maps.MarkerImage(
                'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
                new kakao.maps.Size(26, 46),
                {
                    spriteSize: new kakao.maps.Size(1666, 168),
                    spriteOrigin: new kakao.maps.Point(705, 114),
                    offset: new kakao.maps.Point(13, 46)
                }
            );

            // 토글기능을 위하여 클러스터러에다가 넣습니다.
            let markers = [];
            var rvMarker = new kakao.maps.Marker({
                image : markImage,
                draggable: true,
                map: kakaoMap,
                position: new kakao.maps.LatLng(37.511138, 126.997544)
            });
            markers.push(rvMarker);
            var clusterer = new kakao.maps.MarkerClusterer({
                map: kakaoMap,
                averageCenter: true, 
                minLevel: 1,
                disableClickZoom: true,
            });
            clusterer.addMarkers(markers);
            setRoadClusterer(clusterer);

            var clickHandler = function(mouseEvent) {    
                var position = mouseEvent.latLng; 
                rvMarker.setPosition(position);
                toggleRoadview(position);
            }; 

            function toggleRoadview(position){
                rvClient.getNearestPanoId(position, 50, function(panoId) {
                    if (panoId === null) {
                    roadViewRef.current.style.display = 'none';
                    rvWrapperRef.current.style.pointerEvents  = 'none';
                    kakaoMap.relayout();
                    } else {
                    kakaoMap.relayout();
                    roadViewRef.current.style.display = 'block'; 
                    rvWrapperRef.current.style.pointerEvents  = 'auto';
                    rv.setPanoId(panoId, position);
                    rv.relayout();
                    }
                });
            }

            kakao.maps.event.addListener(kakaoMap, 'click', clickHandler);
            roadBtnRef.current.addEventListener("click", () => {
            kakao.maps.event.removeListener(kakaoMap, 'click', clickHandler);
            setRoadClusterer(clusterer=>{clusterer.clear(); return clusterer;})
            })
            kakaoMap.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
        }else{
            kakaoMap.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
            roadViewRef.current.style.display = 'none';
            rvWrapperRef.current.style.pointerEvents = 'none';
        }

        setIsRoadView(!isRoadView);

    }



    // 1차 기능 -----------
    const toggleMarker = () => {
        isMarker?
        addMarkClust(markerArr, setClusterer) // 마커, 클러스터러 추가
        :
        setClusterer(clusterer=>{if(!clusterer){return clusterer}; clusterer.clear(); return clusterer;}) // 마커, 클러스터러 제거
    }

    useEffect(() => {
        if(!kakaoMap){return;}
        toggleMarker();
    }, [isMarker])

    useEffect(() => {
        if(!kakaoMap){return;}
        if(isMyLocation){
            // 마커의 토글을 위하여 클러스터러안에 마커를 담습니다.
            function displayMarker(locPosition) {
              let markers = [];
              var marker = new kakao.maps.Marker({  
                  map: kakaoMap, 
                  position: locPosition
              });
              markers.push(marker);
        
              var clusterer = new kakao.maps.MarkerClusterer({
                map: kakaoMap,
                averageCenter: true, 
                minLevel: 1,
                disableClickZoom: true,
              });
              clusterer.addMarkers(markers);
              setMyClusterer(clusterer);
              kakaoMap.setCenter(locPosition);      
            }
        
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  var lat = position.coords.latitude, // 위도
                      lon = position.coords.longitude; // 경도
                  var locPosition = new kakao.maps.LatLng(lat, lon);
                  displayMarker(locPosition);
                });
            }else{ 
              alert("navigator.geolocation 지원하지 않음")
            }
        }else{
            setMyClusterer(clusterer=>{ if(!clusterer){return} clusterer.clear(); return clusterer;})
        }
    }, [isMyLocation])
    
    useEffect(() => {
        if(!kakaoMap){return;}
        if(mapType == "normal"){
            kakaoMap.setMapTypeId(kakao.maps.MapTypeId.ROADMAP)
        }else if(mapType == "satellite"){
            kakaoMap.setMapTypeId(kakao.maps.MapTypeId.HYBRID)
        }
    }, [mapType])

    useEffect(() => {
        if(!kakaoMap){return;}
        if(isCadastral){
            kakaoMap.addOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT)
        }else{
            kakaoMap.removeOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT)
        }
    }, [isCadastral])

    useEffect(() => {
        if(!kakaoMap){return;}
        if(mapLevel < 1){
            console.error("mapLevel은 최소 1입니다. mapLevel : " + mapLevel)
            return;
        }
        if(mapLevel > 14){
            console.error("mapLevel은 최대 14입니다. mapLevel : " + mapLevel)
            return;
        }
        kakaoMap.setLevel(mapLevel);
    }, [mapLevel])

    return(
        <div>
            <div className='kakaomapContainer' ref={container} >
                {/* <div ref={container} />
                <TabWrap>
                    <MarkerToggleBtn onClick={onClickMarkerToggle}>마커 클러스터러 토글</MarkerToggleBtn>
                    <MarkerToggleBtn onClick={() => kakaoMap.setMapTypeId(kakao.maps.MapTypeId.ROADMAP) }>일반지도</MarkerToggleBtn>
                    <MarkerToggleBtn onClick={() => kakaoMap.addOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT) }>지적지도 on</MarkerToggleBtn>
                    <MarkerToggleBtn onClick={() => kakaoMap.removeOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT) }>지적지도 off</MarkerToggleBtn>
                    <MarkerToggleBtn onClick={() => kakaoMap.setMapTypeId(kakao.maps.MapTypeId.HYBRID) }>위성지도</MarkerToggleBtn>
                    <MarkerToggleBtn onClick={onClickRoad} ref={roadBtnRef}>로드뷰</MarkerToggleBtn>
                    <MarkerToggleBtn onClick={() => kakaoMap.setLevel(kakaoMap.getLevel() - 1) }>줌인</MarkerToggleBtn>
                    <MarkerToggleBtn onClick={() => kakaoMap.setLevel(kakaoMap.getLevel() + 1) }>줌아웃</MarkerToggleBtn>
                    <MarkerToggleBtn onClick={onClickMy}>내위치</MarkerToggleBtn>
                </TabWrap>
                <RvWrapper ref={rvWrapperRef}>
                    <RoadViewDiv ref={roadViewRef}></RoadViewDiv>
                </RvWrapper> */}
            </div>

        </div>
    )
};

export default KakaoMap;
