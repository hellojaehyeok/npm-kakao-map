# NPM Kakao Map

[kakao map api 샘플](https://apis.map.kakao.com/web/sample/)에 js코드가 있지만 
react로 이주어지지 않았고 반복을 줄이고자 제작하였습니다.        

사용하시면 깃허브에 ⭐ 한 번만 눌러주시면 감사하겠습니다!!      
오류가 있거나 문의할게 있으면 Issues 혹은 이메일로 연락 부탁드립니다.   

예제 코드 아래에서 확인 가능합니다.      
https://github.com/hellojaehyeok/kakao-map-example     

<img width="1761" alt="스크린샷 2022-01-03 오후 9 24 28" src="https://user-images.githubusercontent.com/62782245/147930224-2fa3b723-b832-4d57-8fc9-7eaf4094caee.png">

<br /><br />

## Start!

카카오맵 api를 사용하기 위한 준비과정입니다.    
1. [카카오 디벨로퍼](https://developers.kakao.com/)에 접속한 후 우측 상단 내 어플리케이션을 클릭합니다.
<img width="1743" alt="스크린샷 2022-01-17 오후 11 16 15" src="https://user-images.githubusercontent.com/62782245/149786413-ac9bf183-b27f-4bcc-b560-ca82e014c8f5.png">

2. "애플리케이션 추가하기"를 눌러 프로젝트를 만들어줍니다.

3. 플랫폼 -> Web에서 kakaomap을 사용할 url을 넣습니다.

<img width="1769" alt="스크린샷 2022-01-17 오후 11 25 41" src="https://user-images.githubusercontent.com/62782245/149787914-bce1e986-bb48-457b-a8d3-0e59ea354863.png">

4. 요약정보 -> JavaScript 키를 index.html에 넣습니다.

<img width="1757" alt="스크린샷 2022-01-17 오후 11 30 24" src="https://user-images.githubusercontent.com/62782245/149788611-409e829c-190a-43ed-bc87-ee747041f21b.png">





---
현재있는 기능들은 아래와 같습니다.      
앞으로 계속 추가할 예정입니다.   
1. 일반지도 / 위성지도
2. 교통정보 / 지형정보 / 지적편집도 
3. 현재위치 토글
4. 마커/클러스터러 토글
5. 로드뷰 토글
6. 맵 중심 좌표 정보 얻어오기

<br /><br />

## Installation
---
```
npm i @hellojh/react-kakao-map
```
npm설치 후 index.html에 api키를 넣습니다.
```
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey= -api key- &libraries=clusterer,services"></script>
```

<br /><br />

## Components
---
|이름   | 설명 |
|------|-----|
|`<KakaoMap />`| kakao map을 실행시키는 컴포넌트입니다. |

<br /><br />

## Props
---

|Key   | Description | Type|
|------|-----|-----|
|mapType|지도 타입을 정합니다.|String|
|overlayMapType|지적 오버레이 타입을 정합니다.|String|
|mapLevel|맵 레벨을 넣습니다.|Int|
|mapCenter|맵의 중앙 좌표를 정합니다.|Object|
|isMyLocation|현재 위치로 이동할지 정합니다.|Bool|
|isMarker|마커 토글 유무입니다.|Bool|
|makerOption|마커 옵션입니다.|Object|
|clustererOption|클러스터러 옵션입니다.|Object|
|roadViewRef|로드뷰 렌더 할 돔의 `useRef`입니다.|useRef|
|roadBtnRef|로드뷰 토글 할 버튼의 `useRef`입니다.|useRef|
|isRoadView|로드뷰 토글을 위한 변수입니다.|Bool|
|idleMap|맵 중심 좌표 혹은 레벨이 바뀔 때 정보를 얻어오는 함수입니다.|Function|

### Props 추가 설명
#### mapType        
    1. normal -> 일반지도   
    2. satellite -> 위성지도
        
#### overlayMapType
    1. traffic -> 교통정보
    2. terrain -> 지형정보
    3. use_district -> 지적편집도

#### mapLevel         
    최소 1부터 14까지 있으며 작을수록 줌 인됩니다.         

#### mapCenter       
    lat와 lng에 위도와 경도를 넣습니다.

#### makerOption   
마커 옵션입니다.        

    * makerImg       
    이미지가 있을경우 src에 넣으며 가로, 세로 사이즈를 지정합니다.       
    * posArr        
    마커 위치 배열을 넣습니다.      

makerOption 예시 코드입니다.
```
{
    makerImg:{
        src:null,
        width:0,
        height:0,
    },
    posArr : [
        {lat:37.499, lng:127.026},
        {lat:37.499, lng:127.027},
    ]
}
```

#### clustererOption
클러스터러 옵션입니다.
    
    * disableClickZoom        
    클릭 시 줌인 유무입니다.
    * onClickCenter        
    클릭 시 중점좌표를 반환합니다.
    * minLevel       
    클러스터러 최소 레벨입니다.

clustererOption 예시 코드입니다.
```
{
    disableClickZoom:true,
    onClickCenter:(e) => {console.log(e)},
    minLevel:2,
}
```

#### roadViewRef, roadBtnRef, isRoadView
로드뷰 토글 기능을 사용하기 위해서는 세개가 한 세트입니다.


<br /><br />
