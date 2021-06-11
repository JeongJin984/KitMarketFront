import React, { useEffect, useRef} from 'react';

const Map = ({ lat, long }) => {
  const container = useRef(null);

  useEffect(() => {
    if (container && container.current) {
      const map = new window.kakao.maps.Map(container.current, {
        center: new window.kakao.maps.LatLng(lat, long), //지도의 중심좌표.
        level: 4, //지도의 레벨(확대, 축소 정도)
      }); //지도 생성 및 객체 리턴
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      const markerPosition = new window.kakao.maps.LatLng(lat, long);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    }
    return () => {};
  }, [container]);

  return (
    <div
      className="map"
      style={{ width: "300px", height: "240px", float: "right" }}
      ref={container}
    ></div>
  );
};

export default Map;