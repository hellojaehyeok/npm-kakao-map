import React, { useEffect, useRef, useState } from 'react';
import './kakaomap.css';

const { kakao } = window;

const KakaoMap = ({mapType, overlayMapType, mapLevel,mapCenter, isMyLocation, makerOption, isMarker, clustererOption}) => {
    const container = useRef(); 
    const [kakaoMap, setKakaoMap] = useState(null);
    const [, setClusterer] = useState(); 

    const [, setMyClusterer] = useState(); 

    const rvWrapperRef = useRef();
    const roadViewRef = useRef();
    const roadBtnRef = useRef();
    const [, setRoadClusterer] = useState();
    const [isRoadView, setIsRoadView] = useState(false);


    // (좌표값이 들어있는배열, 클러스터러, 마커이미지, 클러스터러이미지)
    const addMarkClust = (array, setClusterer, markerImg) => {
        if(array.length == 0){console.error("No marker array"); return;}

        
        var markerImage = null;
        if(markerImg){
            var imageSize = new kakao.maps.Size(makerOption.makerImg.width, makerOption.makerImg.height),
                imageOption = {offset: new kakao.maps.Point(4, 4)};
            markerImage = new kakao.maps.MarkerImage(markerImg, imageSize, imageOption);
        }
    
        let markers = [];
        array.map(item => {
            markers.push(
                new kakao.maps.Marker({
                    map: kakaoMap, 
                    position: new kakao.maps.LatLng(item.lat, item.lng),
                    image: markerImage, 
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


    useEffect(() => {
        if(!mapCenter || !mapCenter.lat || !mapCenter.lng){
            console.error("mapCenter Error")
            return;
        }
        const options = {
            center : new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
            level: mapLevel  // 처음 줌 거리 낮을수록 줌인
        };
        const map = new kakao.maps.Map(container.current, options); 
        setKakaoMap(map);
    }, [container]);

    const toggleMarker = () => {
        isMarker?
        addMarkClust(makerOption.posArr, setClusterer, makerOption.makerImg.src) // 마커, 클러스터러 추가
        :
        setClusterer(clusterer=>{if(!clusterer){return clusterer}; clusterer.clear(); return clusterer;}) // 마커, 클러스터러 제거
    }

    useEffect(() => {
        if(!kakaoMap){return;}
        if(kakaoMap) toggleMarker();
    }, [isMarker, kakaoMap])

    useEffect(() => {
        if(!kakaoMap){return;}
        runMyLocation();
    }, [isMyLocation, kakaoMap])
    
    const runMyLocation= () => {
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
              console.error("navigator.geolocation 지원하지 않음")
            }
        }else{
            setMyClusterer(clusterer=>{ if(!clusterer){return} clusterer.clear(); return clusterer;})
        }
    }

    useEffect(() => {
        if(!kakaoMap){return;}
        if(mapType == "normal"){
            kakaoMap.setMapTypeId(kakao.maps.MapTypeId.ROADMAP)
        }else if(mapType == "satellite"){
            kakaoMap.setMapTypeId(kakao.maps.MapTypeId.HYBRID)
        }
    }, [mapType, kakaoMap])

    useEffect(() => {
        if(!kakaoMap){return;}

        let changeMapType = null;
        if(overlayMapType == "traffic"){
            changeMapType = kakao.maps.MapTypeId.TRAFFIC; 
        }else if(overlayMapType == "roadview"){
            changeMapType = kakao.maps.MapTypeId.ROADVIEW; 
        }else if(overlayMapType == "terrain"){
            changeMapType = kakao.maps.MapTypeId.TERRAIN; 
        }else if(overlayMapType == "use_district"){
            changeMapType = kakao.maps.MapTypeId.USE_DISTRICT; 
        }else{
            return;
        }

        if(changeMapType){
            kakaoMap.addOverlayMapTypeId(changeMapType)
        }
    }, [overlayMapType, kakaoMap])


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
                    <MarkerToggleBtn onClick={onClickRoad} ref={roadBtnRef}>로드뷰</MarkerToggleBtn>
                <RvWrapper ref={rvWrapperRef}>
                    <RoadViewDiv ref={roadViewRef}></RoadViewDiv>
                </RvWrapper> */}
            </div>
        </div>
    )
};

export default KakaoMap;
