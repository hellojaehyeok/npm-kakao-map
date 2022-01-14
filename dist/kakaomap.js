"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _window = window,
    kakao = _window.kakao;

var KakaoMap = function KakaoMap(_ref) {
  var mapType = _ref.mapType,
      overlayMapType = _ref.overlayMapType,
      mapLevel = _ref.mapLevel,
      mapCenter = _ref.mapCenter,
      isMyLocation = _ref.isMyLocation,
      makerOption = _ref.makerOption,
      isMarker = _ref.isMarker,
      clustererOption = _ref.clustererOption,
      roadViewRef = _ref.roadViewRef,
      roadBtnRef = _ref.roadBtnRef,
      isRoadView = _ref.isRoadView,
      idleMap = _ref.idleMap;
  var container = (0, _react.useRef)();

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      kakaoMap = _useState2[0],
      setKakaoMap = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      setClusterer = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      setMyClusterer = _useState6[1];

  var _useState7 = (0, _react.useState)(),
      _useState8 = _slicedToArray(_useState7, 2),
      setRoadClusterer = _useState8[1];

  var _useState9 = (0, _react.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      currentOverlayType = _useState10[0],
      setCurrentOverlayType = _useState10[1]; // (좌표값이 들어있는배열, 클러스터러, 마커이미지, 클러스터러이미지)


  var addMarkClust = function addMarkClust(array, setClusterer, markerImg) {
    if (array.length == 0) {
      console.error("No marker array");
      return;
    }

    var markerImage = null;

    if (markerImg) {
      var imageSize = new kakao.maps.Size(makerOption.makerImg.width, makerOption.makerImg.height),
          imageOption = {
        offset: new kakao.maps.Point(4, 4)
      };
      markerImage = new kakao.maps.MarkerImage(markerImg, imageSize, imageOption);
    }

    var markers = [];
    array.map(function (item) {
      markers.push(new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(item.lat, item.lng),
        image: markerImage
      }));
    });
    var clusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap,
      averageCenter: true,
      minLevel: clustererOption.minLevel,
      disableClickZoom: clustererOption.disableClickZoom
    });
    clusterer.addMarkers(markers);
    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
      clustererOption.onClickCenter({
        lat: cluster._center.toLatLng().Ma,
        lng: cluster._center.toLatLng().La
      });
    });
    setClusterer(clusterer);
  }; // 로드맵 토글


  (0, _react.useEffect)(function () {
    if (!kakaoMap) {
      return;
    }

    if (!roadViewRef || !roadBtnRef) {
      return;
    }

    if (isRoadView) {
      var toggleRoadview = function toggleRoadview(position) {
        rvClient.getNearestPanoId(position, 50, function (panoId) {
          if (panoId === null) {
            roadViewRef.current.style.display = 'none';
            roadViewRef.current.style.pointerEvents = 'none';
            kakaoMap.relayout();
          } else {
            kakaoMap.relayout();
            roadViewRef.current.style.display = 'block';
            roadViewRef.current.style.pointerEvents = 'auto';
            rv.setPanoId(panoId, position);
            rv.relayout();
          }
        });
      };

      var rv = new kakao.maps.Roadview(roadViewRef.current);
      var rvClient = new kakao.maps.RoadviewClient();
      var markImage = new kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png', new kakao.maps.Size(26, 46), {
        spriteSize: new kakao.maps.Size(1666, 168),
        spriteOrigin: new kakao.maps.Point(705, 114),
        offset: new kakao.maps.Point(13, 46)
      }); // 토글기능을 위하여 클러스터러에다가 넣습니다.

      var markers = [];
      var rvMarker = new kakao.maps.Marker({
        image: markImage,
        draggable: true,
        map: kakaoMap,
        position: new kakao.maps.LatLng(37.511138, 126.997544)
      });
      markers.push(rvMarker);
      var clusterer = new kakao.maps.MarkerClusterer({
        map: kakaoMap,
        averageCenter: true,
        minLevel: 1,
        disableClickZoom: true
      });
      clusterer.addMarkers(markers);
      setRoadClusterer(clusterer);

      var clickHandler = function clickHandler(mouseEvent) {
        var position = mouseEvent.latLng;
        rvMarker.setPosition(position);
        toggleRoadview(position);
      };

      kakao.maps.event.addListener(kakaoMap, 'click', clickHandler);
      roadBtnRef.current.addEventListener("click", function () {
        kakao.maps.event.removeListener(kakaoMap, 'click', clickHandler);
        setRoadClusterer(function (clusterer) {
          clusterer.clear();
          return clusterer;
        });
      });
      kakaoMap.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
    } else {
      kakaoMap.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
      roadViewRef.current.style.display = 'none';
      roadViewRef.current.style.pointerEvents = 'none';
    }
  }, [isRoadView, kakaoMap]);
  (0, _react.useEffect)(function () {
    if (!mapCenter || !mapCenter.lat || !mapCenter.lng) {
      console.error("mapCenter Error");
      return;
    }

    var options = {
      center: new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
      level: mapLevel // 처음 줌 거리 낮을수록 줌인

    };
    var map = new kakao.maps.Map(container.current, options);
    setKakaoMap(map);
  }, [container]);

  var toggleMarker = function toggleMarker() {
    isMarker ? addMarkClust(makerOption.posArr, setClusterer, makerOption.makerImg.src) // 마커, 클러스터러 추가
    : setClusterer(function (clusterer) {
      if (!clusterer) {
        return clusterer;
      }

      ;
      clusterer.clear();
      return clusterer;
    }); // 마커, 클러스터러 제거
  };

  (0, _react.useEffect)(function () {
    if (!kakaoMap) {
      return;
    }

    if (kakaoMap) toggleMarker();
  }, [isMarker, kakaoMap]);
  (0, _react.useEffect)(function () {
    if (!kakaoMap) {
      return;
    }

    runMyLocation();
  }, [isMyLocation, kakaoMap]);

  var runMyLocation = function runMyLocation() {
    if (isMyLocation) {
      // 마커의 토글을 위하여 클러스터러안에 마커를 담습니다.
      var displayMarker = function displayMarker(locPosition) {
        var markers = [];
        var marker = new kakao.maps.Marker({
          map: kakaoMap,
          position: locPosition
        });
        markers.push(marker);
        var clusterer = new kakao.maps.MarkerClusterer({
          map: kakaoMap,
          averageCenter: true,
          minLevel: 1,
          disableClickZoom: true
        });
        clusterer.addMarkers(markers);
        setMyClusterer(clusterer);
        kakaoMap.setCenter(locPosition);
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude,
              // 위도
          lon = position.coords.longitude; // 경도

          var locPosition = new kakao.maps.LatLng(lat, lon);
          displayMarker(locPosition);
        });
      } else {
        console.error("navigator.geolocation 지원하지 않음");
      }
    } else {
      setMyClusterer(function (clusterer) {
        if (!clusterer) {
          return;
        }

        clusterer.clear();
        return clusterer;
      });
    }
  };

  (0, _react.useEffect)(function () {
    if (!kakaoMap) {
      return;
    }

    if (mapType == "normal") {
      kakaoMap.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    } else if (mapType == "satellite") {
      kakaoMap.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
    }
  }, [mapType, kakaoMap]);
  (0, _react.useEffect)(function () {
    if (!kakaoMap) {
      return;
    }

    var changeMapType = null;

    if (overlayMapType == "traffic") {
      changeMapType = kakao.maps.MapTypeId.TRAFFIC;
    } else if (overlayMapType == "terrain") {
      changeMapType = kakao.maps.MapTypeId.TERRAIN;
    } else if (overlayMapType == "use_district") {
      changeMapType = kakao.maps.MapTypeId.USE_DISTRICT;
    } else {
      if (currentOverlayType.length) {
        currentOverlayType.map(function (item) {
          kakaoMap.removeOverlayMapTypeId(item);
        });
        setCurrentOverlayType([]);
      }

      return;
    }

    if (changeMapType) {
      if (!currentOverlayType.some(function (item) {
        return item == changeMapType;
      })) {
        var newArr = currentOverlayType;
        newArr.push(changeMapType);
        setCurrentOverlayType(_toConsumableArray(newArr));
      }

      kakaoMap.addOverlayMapTypeId(changeMapType);
    }
  }, [overlayMapType, kakaoMap]);
  (0, _react.useEffect)(function () {
    if (!kakaoMap) {
      return;
    }

    if (mapLevel < 1) {
      console.error("mapLevel은 최소 1입니다. mapLevel : " + mapLevel);
      return;
    }

    if (mapLevel > 14) {
      console.error("mapLevel은 최대 14입니다. mapLevel : " + mapLevel);
      return;
    }

    kakaoMap.setLevel(mapLevel);
  }, [mapLevel]);
  var geocoder = new kakao.maps.services.Geocoder();

  function searchAddrFromCoords(coords, callback) {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }

  (0, _react.useEffect)(function () {
    if (!kakaoMap) {
      return;
    }

    ;
    kakao.maps.event.addListener(kakaoMap, 'idle', function () {
      searchAddrFromCoords(kakaoMap.getCenter(), displayCenterInfo);
    });
  }, [kakaoMap]);

  function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      idleMap && idleMap(result);
    }
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "100%",
      height: "100%"
    },
    ref: container
  });
};

var _default = KakaoMap;
exports.default = _default;