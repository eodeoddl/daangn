import axios from 'axios';

class KakaoMapAPI {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://dapi.kakao.com/v2',
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
      },
    });
  }

  // 현재 좌표로 주소구하기
  async getAddress(longitude, latitude) {
    try {
      // console.log(this.api);
      const response = await this.api.get('local/geo/coord2regioncode.json', {
        params: {
          x: longitude,
          y: latitude,
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}

export default KakaoMapAPI;
