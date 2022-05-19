import axios from 'axios';

class Item {
  constructor() {
    this.item = axios.create({
      baseURL: 'http://localhost:4000',
    });

    this.cancelToken = axios.CancelToken;
  }

  static cancel;

  // limit 값으로 가져올 개수, 시작인덱스 받기
  async getLatestList(start, limit) {
    try {
      const response = await this.item.get('data', {
        params: {
          _sort: 'id',
          _order: 'desc',
          _start: start,
          _limit: limit,
        },
      });
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  // 검색 api (내용으로..)
  async onSearch(query) {
    try {
      const response = await this.item.get('data', {
        params: {
          _sort: 'id',
          _order: 'desc',
          q: query,
        },
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  // item id 검색 api
  async getItemById(id) {
    try {
      const response = await this.item.get('data', {
        params: {
          id: id,
        },
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  // axios cancel api
  async getCancel(c) {
    try {
      await this.item.get({
        cancelToken: new this.cancelToken('', function executor(c) {
          this.cancel = c;
        }),
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default Item;
