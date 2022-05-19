import React, { useState } from 'react';
import styled from 'styled-components';
import HotItem from '../hotItem/hotItem';

const regionData = {
  region1: {},
  서울특별시: {
    강남구: {},
    강동구: {},
    강북구: {},
    강서구: {},
    관악구: {},
    광진구: {},
    구로구: {},
    금천구: {},
    노원구: {},
    도봉구: {},
    동대문구: {},
    동작구: {},
    마포구: {},
    서대문구: {},
    서초구: {},
    성동구: {},
    성북구: {},
    송파구: {},
    양천구: {},
    영동포구: {},
    용산구: {},
    은평구: {},
    종로구: {},
    중구: {},
    중랑구: {},
  },
  세종특별자치시: [
    '가람동',
    '고운동',
    '금남면',
    '나성동',
    '다정동',
    '대평동',
    '도담동',
    '반곡동',
    '보람동',
    '부강면',
    '새롬동',
    '소담동',
    '소정면',
    '아름동',
    '어진동',
    '연기면',
    '연동면',
    '연서면',
    '장군면',
    '전동면',
    '전의면',
    '조치원읍',
    '종촌동',
    '한솔동',
    '해밀동',
  ],
  제주특별자치도: ['서귀포시', '제주시'],
};

const Content = styled.section`
  margin-top: 120px;

  .title {
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.6px;
    text-align: center;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 40px;
  }
  .articles-navigation {
    width: 980px;
    margin: 0 auto;
    text-align: right;
    margin-bottom: 30px;
    .select-box {
      width: 180px;
      padding: 12px 16px;
      margin-left: 6px;
      font-size: 17px;
      letter-spacing: -0.6px;
      appearance: none;
      background: #fff url('/images/icon-arrow-down.svg') no-repeat 95% 50%;
      border: solid 1px ${({ theme }) => theme.colors['gray500']};
      border-radius: 6px;
    }
  }
  .wrapper {
    width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const HotArticles = ({ hotItems }) => {
  const [selectedValue, setSelectedValue] = useState([]);
  // const [checkSelected, setCheckSelected] = useState(false);
  // console.log(Object.keys(regionData));
  // console.log(regionData['제주특별자치도']);
  // console.log(selectedValue);
  const handleSelected = (modify, value) => {
    switch (modify) {
      case 'region1':
        setSelectedValue([value]);
        break;
      case 'region2':
        if (selectedValue.length !== 2) {
          console.log('1');
          setSelectedValue([...selectedValue, value]);
        } else {
          console.log('2');
          selectedValue.splice(-1, 1);
          setSelectedValue([...selectedValue, value]);
        }
        console.log(selectedValue.length);
        console.log(selectedValue);
        break;
      case 'region3':
        if (selectedValue.length !== 3) {
          console.log('1');
          setSelectedValue([...selectedValue, value]);
        } else {
          console.log('2');
          selectedValue.splice(-1, 1);
          setSelectedValue([...selectedValue, value]);
        }
        break;
      default:
        console.log('default');
    }
  };
  //   console.log(value);
  //   if (!checkSelected) {
  //     setSelectedValue([...setSelectedValue, value]);
  //     console.log('1');
  //     console.log(selectedValue);
  //   } else {
  //     selectedValue.splice(-1, 1);
  //     setSelectedValue([...selectedValue, value]);
  //     console.log('2');
  //   }
  //   console.log(selectedValue);
  // console.log(selectedValue);
  return (
    hotItems && (
      <Content>
        <h1 className='title'>
          {selectedValue.length > 0 && selectedValue.join(' ')} 중고거래
          인기매물
        </h1>
        <nav className='articles-navigation'>
          <select
            className='select-box'
            onChange={(e) => handleSelected('region1', e.target.value)}
          >
            <option value=''>지역을 선택하세요</option>
            {regionData &&
              Object.keys(regionData).map((region1, i) => (
                <option value={region1} key={i}>
                  {region1}
                </option>
              ))}
          </select>
          <select
            className='select-box'
            onChange={(e) => handleSelected('region2', e.target.value)}
          >
            <option value='1s'>동네를 선택하세요</option>
            {selectedValue.length > 0 &&
              Object.keys(regionData[selectedValue[0]]).map((region2, i) => (
                <option value={region2} key={i}>
                  {region2}
                </option>
              ))}
          </select>
          <select
            className='select-box'
            onChange={(e) => handleSelected('region3', e.target.value)}
          >
            <option value='11'>1</option>
            <option value='22'>2</option>
          </select>
        </nav>
        <section className='wrapper'>
          {hotItems.map((item, i) => (
            <HotItem item={item} key={i} />
          ))}
        </section>
        <section></section>
      </Content>
    )
  );
};

export default HotArticles;
