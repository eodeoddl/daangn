import React, { useState, useEffect } from 'react';

const UseGeolocation = (coord2addressAPI) => {
  // const [location, setLocation] = useState({
  //   loaded: false,
  //   region_B: '',
  //   region_H: '',
  // });

  useEffect(() => {
    const success = (position) => {
      coord2addressAPI(
        position.coords.longitude,
        position.coords.latitude
      ).then((res) => {
        const [B, H] = res.documents;
        // setLocation({ loaded: true, region_B: B, region_H: H });
      });
    };

    const error = () => {
      console.log('not surpported on your device');
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('error');
    }
  }, [coord2addressAPI]);

  return null;
};

export default UseGeolocation;
