<template>
    <!-- <div class="info">
        <div style="display: flex; align-items: center; justify-content: center;">
            <h1 style="display: flex; justify-content: center;">Center: {{ center }}</h1>
            <span>Zoom: {{ zoom }}</span>
            <span>Bounds: {{ bounds }}</span>
        </div>
    </div> -->
    <div id="map">
    </div>
</template>
  
<script>
import COMMON_UTIL from "../../resources/js/commonUtil.js";

import "leaflet/dist/leaflet.css"
import L, { latLng } from "leaflet";
import {
    LMap,
    LTileLayer,
    LControlZoom,
    LGeoJson,
    LMarker,
    LIcon
} from "@vue-leaflet/vue-leaflet";

// 영천시 json - 기존
import am5geodata_yeongcheon from "./map";

export default {
    props: {
        chartDataName: {
            type: Array,
            default: [],
        },

        chartData: {
            type: Array,
            default: [],
        },
    },

    data() {
        return {
            // 읍면동 목록
            emdList: [],

            // 선택된 읍면동
            selectedEmd: null,

            // 지도 차트 객체
            map: {},

            // 줌 단계
            zoom: 11,
            // 최소 줌 단계
            minZoom: 9,
            // 최대 줌 단계(18이 최대)
            maxZoom: 17,
            // 줌 애니메이션 효과(적용 여부X)
            zoomAnimation: true,
            fadeAnimation: true,

            // 지도 중앙 좌표
            // center: [35.978005, 129.003698], // 주제도 설정 메뉴 존재 시
            center: [35.978005, 129.103698], // FHD(1920x1080): 35.978005, 129.103698 / QHD(2560x1440): 35.978005, 129.203698

            // 지도 범위(경계) 좌표(좌하단 좌표, 우상단 좌표로 사각형 영역 구성)
            bounds: null,

            // 지도 이미지 설정
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',

            // 영천시 지도 JSON
            geoJson: am5geodata_yeongcheon,

            // 영천시 지도 JSON 객체
            geoJsonObject: {},

            // 영천시 geoJson 옵션(함수 실행 연결점)
            geoOption: {
                onEachFeature: this.onEachFeature,
            },

            // 영천시 geoJson 스타일
            geoStyle: {
                default: {
                    fillColor:"#e4ce7f",
                    weight: 3,
                    opacity: 0.8,
                    color: "#CC3D3D",
                    dashArray: "3",
                    fillOpacity: 0,
                },
                hover: {
                    color: '#CC3D3D',//'#6B9900', //테두리 선 색상
                    weight: 4,//테두리 선 두께
                    opacity: 1,//테두리 선 투명도
                    dashArray: '1',
                    fillColor: '#e4ce7f',
                    fillOpacity: 0.8,
                },
                clicked: {
                    color: '#CC3D3D',//'#6B9900', //테두리 선 색상
                    weight: 4,//테두리 선 두께
                    opacity: 1,//테두리 선 투명도
                    fillColor: '#e4ce7f',
                    fillOpacity: 0.4,
                },
            },

            pallet: {
                burgundy: "#CC3D3D",
                yellow_brown: "#e4ce7f",
                green: "#0ecb69",
            },

            elayer: {},

            // 소상공인 마커 목록
            markerList: [],

            // 소상공인 아이콘 옵션
            iconOption: {
                // iconUrl: iconImage.url,
                // shadowUrl: 'leaf-shadow.png',
                iconSize: [20, 20], // 아이콘 크기
                iconAnchor: [10, 10], // 중심 좌표로부터 아이콘 위치
                popupAnchor: [0, -10], // 아이콘 위치로부터 팝업 위치
            },

            // 아이콘 이미지 목록
            iconImage: {},

            // 소상공인 아이콘 이미지 (사용 안함)
            /* iconImages : [
                {name: '소매', url: '../../resources/file/svg/잡화.png',},
                {name: '생활서비스', url: '../../resources/file/svg/가전.png'},
                {name: '부동산', url: '../../resources/file/svg/부동산.png'},
                {name: '관광/여가/오락', url: '../../resources/file/svg/레저.png'},
                {name: '숙박', url: '../../resources/file/svg/숙박.png'},
                {name: '스포츠', url: '../../resources/file/svg/스포츠.png'},
                {name: '음식', url: '../../resources/file/svg/음식점.png'},
                {name: '학문/교육', url: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%88%99%EB%B0%95.png'},
                {name: '기타', url: '../../resources/file/svg/기타.png'},
            ] */
        };
    },

    methods: {
       
        // geoJson에서 읍면동 목록 조회
        emdSelectList() {
            // console.log('emdList: ', this.geoJson);
            let geoJsonList = this.geoJson.features;
            for(let i = 0; i < geoJsonList.length; i ++) {
                this.emdList.push(geoJsonList[i].properties['name']);
            }
        },

        /* // 줌 단계 변경 시
        zoomUpdated (zoom) {
            this.zoom = zoom;
            console.log('zoom: ', zoom);
        },

        // 중앙 위치 변경 시
        centerUpdated (center) {
            this.center = center;
        },

        // 지도 범위 변경 시
        boundsUpdated (bounds) {
            this.bounds = bounds;
        }, */

        // 영천시 geoJson 옵션 함수
        onEachFeature(feature, layer) {
            layer.on({
                mouseover: this.highlightFeature,
                mouseout: this.resetHighlight,
                click: this.zoomToFeature
            });
        },

        // geoJson 마우스 오버시
        highlightFeature(e) {
            const vm = this;
            this.elayer = e.target; // 마우스 인, 아웃, 클릭 시 동일한 target을 사용해야해서 공유 데이터 선언
            const layer = e.target;
            // console.log('layer over: ', this.elayer);

            if(this.selectedEmd != null) {
                if(layer.feature.properties['adm_cd2'] != this.selectedEmd.feature.properties['adm_cd2']) {
                    // 마우스 오버시 색상 설정
                    this.elayer.setStyle(vm.geoStyle['hover']);

                    this.elayer.bringToFront();
                }
            } else {
                this.elayer.setStyle(vm.geoStyle['hover']);

                this.elayer.bringToFront();
            }

            // 툴팁 설정
            const properties = this.elayer.feature.properties;
            const tooltip = L.tooltip({
                className: 'leaflet-tooltip',
                direction: 'top',
                permanent: true,
                opacity: 1,
            }).setContent(`${properties.name}`);

            this.elayer.bindTooltip(tooltip);
        },

        // geoJson 마우스 아웃시
        resetHighlight(e) {
            const vm = this;
            const layer = e.target;
            // console.log('layer over: ', this.elayer);
            
            if(this.selectedEmd != null) {
                if(layer.feature.properties['adm_cd2'] != this.selectedEmd.feature.properties['adm_cd2']) {
                    // 마우스 아웃시 색상 설정
                    // this.elayer.setStyle(vm.geoStyle['default']);
                    this.geoJsonObject.resetStyle(this.elayer);
                }
            } else {
                this.geoJsonObject.resetStyle(this.elayer);
            }

            // 툴팁 제거
            this.elayer.unbindTooltip();
        },

        // geoJson 클릭시
        zoomToFeature(e) {
            const vm = this;
            const layer = e.target;

            
            // 해당 읍면동으로 확대
            this.map.fitBounds(this.elayer.getBounds());
            if(this.selectedEmd != null) {
                if(layer.feature.properties['adm_cd2'] != this.selectedEmd.feature.properties['adm_cd2']) {
                    this.map.fitBounds(this.elayer.getBounds());
                }
            } else {
                let bounds = this.elayer.getBounds();
                // 한 번만 실행
                bounds._northEast.lng += 0.02995;//분석 시각화 차트 영역 만큼 왼쪽으로 이동
                bounds._southWest.lng += 0.02995;//분석 시각화 차트 영역 만큼 왼쪽으로 이동
                this.map.fitBounds(bounds);
            }

            if(this.selectedEmd != null) {
                // 마우스 클릭시 이전 읍면동 색상 초기화
                this.geoJsonObject.resetStyle(this.selectedEmd);
            }
            // 마우스 클릭한 읍면동 색상 설정
            this.elayer.setStyle(vm.geoStyle['clicked']);

            // 툴팁 제거
            // layer.unbindTooltip();
            // console.log('emd: ', this.elayer.feature);
            this.$emit("selectEmd", this.elayer.feature.properties['name'], Number(layer.feature.properties['adm_cd2']));
            // this.selectedEmd = Number(layer.feature.properties['adm_cd2']);
            this.selectedEmd = layer;
        },
        
    },

    computed: {
        
    },

    watch: {
        chartData: {
            // immediate: true, // mounted 기능
            handler(newValue, oldValue) {
                // console.log('chartData1: ', newValue);
                // console.log('chartData2: ',oldValue);
                if (JSON.stringify(newValue) === JSON.stringify(oldValue) != true){

                    //기존 Marker 제거
                    if (COMMON_UTIL.isEmpty(this.markerList) == false) {
                        for (var i = 0; i < this.markerList.length; i++) {
                            this.markerList[i].remove();
                        }
                    }

                    this.markerList = [];
                    // console.log('markerList: ', this.markerList);
                    
                    // Marker 생성
                    for(let i = 0; i < newValue.length; i ++) {
                        let item = newValue[i];
                        // 아이콘
                        let iconCode = "icon" + item['trdar_induty_lclas_code'];
                        // 툴팁
                        let tooltipText = '[' + item['trdar_induty_lclas_nm'] + '] ' + item['cmpnm_nm'];
                        // 팝업
                        let popupHtml = '' +
                        '<p class="layerlist_title ta_center">' + item['cmpnm_nm'] + '</p>' +
                        '<p>업종 : ' + item['trdar_induty_sclas_nm'] + '</p>' +
                        '<p>주소 : ' + item['rn_adres'] + '</p>';
                        
                        // const latlng = L.latLng(item['la'], item['lo']);
                        // let marker = L.marker([item['la'], item['lo']], {icon: this.iconImage[iconCode]}).addTo(this.map).bindTooltip(tooltipText).bindPopup(popupHtml);
                        let marker = L.marker({lat: item['la'], lng: item['lo']}, {icon: this.iconImage[iconCode]}).addTo(this.map);
                        this.markerList.push(marker);
                    }
                }
            }
        },
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        /* chartData: function (newValue, oldValue) {
            console.log('map watch: ', newValue, oldValue); */

            // let marketIcon = L.Icon.extend({options: this.iconOption});

            // icon 클래스 정의 => L.Icon(대문자).. 일회성 icon 사용방법 => L.icon(소문자)
            /* let marketIcon = L.Icon.extend({ options: this.iconOption}); */

            /* let iconD = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%9E%A1%ED%99%94.png'}); // 소매
            let iconF = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%ED%86%B5%EC%8B%A0.png'}); // 생활서비스
            let iconL = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%88%99%EB%B0%95.png'}); // 부동산
            let iconN = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EA%B3%B5%EC%97%B0.png'}); // 관광/여가/오락
            let iconO = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%88%99%EB%B0%95.png'}); // 숙박
            let iconP = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%ED%97%AC%EC%8A%A4.png'}); // 스포츠
            let iconQ = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%9D%8C%EC%8B%9D%EC%A0%90.png'}); // 음식
            let iconR = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EA%B5%90%EC%9C%A1.png'}); // 학문/교육
            let iconEtc = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%88%99%EB%B0%95.png'}); // 기타 */

            /* let iconD = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%9E%A1%ED%99%94.png'}); // 소매
            let iconF = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%ED%86%B5%EC%8B%A0.png'}); // 생활서비스
            let iconL = new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%88%99%EB%B0%95.png'}); // 부동산 */

            // 아이콘 이미지 URL
            /* let iconImage = {
                iconD: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%9E%A1%ED%99%94.png'}), // 소매
                iconF: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%ED%86%B5%EC%8B%A0.png'}), // 생활서비스
                iconL: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%88%99%EB%B0%95.png'}), // 부동산
                iconN: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EA%B3%B5%EC%97%B0.png'}), // 관광/여가/오락
                iconO: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%88%99%EB%B0%95.png'}), // 숙박
                iconP: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%ED%97%AC%EC%8A%A4.png'}), // 스포츠
                iconQ: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%9D%8C%EC%8B%9D%EC%A0%90.png'}), // 음식
                iconR: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EA%B5%90%EC%9C%A1.png'}), // 학문/교육
            } */

            //마커
            /* L.marker([35.96362961, 128.937125], {icon: iconD}).addTo(this.map).bindTooltip("소매").bindPopup("소매");
            L.marker([35.96329383, 128.9374204], {icon: iconF}).addTo(this.map).bindPopup("생활서비스");
            L.marker([35.96152929, 128.9394727], {icon: iconL}).addTo(this.map).bindPopup("부동산");
            L.marker([35.97859877, 128.9779302], {icon: iconN}).addTo(this.map).bindPopup("관광/여가/오락");
            L.marker([35.978005, 129.003698], {icon: iconO}).addTo(this.map).bindPopup("숙박");
            L.marker([35.97279842, 128.9344615], {icon: iconP}).addTo(this.map).bindPopup("스포츠");
            L.marker([35.96422906, 128.9202252], {icon: iconQ}).addTo(this.map).bindTooltip("음식점").bindPopup("음식점");
            L.marker([35.96093121, 128.9375809], {icon: iconR}).addTo(this.map).bindPopup("학문/교육"); */
            // L.marker([35.93056995, 128.8688807], {icon: Icon9}).addTo(this.map).bindPopup("기타");

            /* //기존 Maker 제거
            if (COMMON_UTIL.isEmpty(this.markerList) == false) {
                for (var i = 0; i < this.markerList.length; i++) {
                    this.markerList[i].remove();
                }
            }

            for(let i = 0; i < newValue.length; i ++) {
                let item = newValue[i];
                let iconCode = "icon" + item['trdar_induty_lclas_code'];
                
                let marker = L.marker([item['la'], item['lo']], {icon: this.iconImage[iconCode]}).addTo(this.map).bindPopup(item['cmpnm_nm']);
                this.markerList.push(marker);
            } */
        /* }, */
    },

    components: {
        'LMap': LMap,
        'LTileLayer': LTileLayer,
        'LControlZoom': LControlZoom,
        'LGeoJson': LGeoJson,
        'LMarker': LMarker,
        'LIcon' : LIcon,
    },

    mounted() {
        this.emdSelectList();

        // 맵 생성
        this.map = L.map("map", {
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            zoomAnimation: this.zoomAnimation,
            fadeAnimation: this.fadeAnimation,
        }).setView(this.center, this.zoom);

        // 맵 이미지 생성
        L.tileLayer(this.url, {
            attribution: this.attribution,
        }).addTo(this.map);

        // 영천시 폴리곤 맵 생성
        this.geoJsonObject = L.geoJson(this.geoJson, {
            style: this.geoStyle['default'],
            onEachFeature: this.onEachFeature
        }).addTo(this.map);

        // icon 클래스 정의 => L.Icon(대문자).. 일회성 icon 사용방법 => L.icon(소문자)
        let marketIcon = L.Icon.extend({ options: this.iconOption});

        // 아이콘 이미지 URL
        this.iconImage = {
            iconD: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%9E%A1%ED%99%94.png'}), // 소매
            iconF: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%ED%86%B5%EC%8B%A0.png'}), // 생활서비스
            iconL: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%88%99%EB%B0%95.png'}), // 부동산
            iconN: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EA%B3%B5%EC%97%B0.png'}), // 관광/여가/오락
            iconO: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%88%99%EB%B0%95.png'}), // 숙박
            iconP: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%ED%97%AC%EC%8A%A4.png'}), // 스포츠
            iconQ: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EC%9D%8C%EC%8B%9D%EC%A0%90.png'}), // 음식
            iconR: new marketIcon({iconUrl: 'http://210.180.118.83:8030/resources/common/file/img/business/%EA%B5%90%EC%9C%A1.png'}), // 학문/교육
        }
    }
};
</script>
  
<style>
.layerlist_title{
	background: #42547f;
	color: #fff;
	padding: 10px;
	font-size: 14px;
}
</style>
  