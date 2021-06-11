import React, { useEffect, useRef } from 'react';

const MarkableMap = ({ setLat, setLong, initialLat, initialLong }) => {
  const container = useRef(null);

  useEffect(() => {
    if (container && container.current) {
      const centerLat = initialLat || 36.14563440248675;
      const centerLong = initialLong ||  128.39351690385928;
      const map = new window.kakao.maps.Map(container.current, {
        center: new window.kakao.maps.LatLng(centerLat, centerLong),
        level: 4, 
      });

      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      
      const marker = new window.kakao.maps.Marker({
        position: map.getCenter(),
      });
      marker.setMap(map);

      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        const latlng = mouseEvent.latLng;
        marker.setPosition(latlng);
        const lat = latlng.getLat();
        const long = latlng.getLng();
        setLat(lat);
        setLong(long);
      });
    }
    return () => {};
  }, [container, setLat, setLong]);

  return (
    <div
      className="map"
      style={{ width: "70%", height: "250px", float: "right" }}
      ref={container}
    ></div>
  );
};

export default MarkableMap;