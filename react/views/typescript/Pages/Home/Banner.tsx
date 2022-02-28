import React from 'react';
import styled from 'styled-components';
import Banner_1 from '../../Assets/Images/Banner_1.png';
import Banner_2 from '../../Assets/Images/Banner_2.png';
import Banner_3 from '../../Assets/Images/Banner_3.png';
import Banner_4 from '../../Assets/Images/Banner_4.png';
// Swiper
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { useNavigate } from 'react-router';
// install Swiper modules
SwiperCore.use([Pagination]);

const Banner = () => {
  const navigate = useNavigate();

  return (
    <Banner_Container>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        className="mySwiper"
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <img
            src={Banner_1}
            alt="banner"
            className="banner_img"
            onClick={() => {
              navigate('/banner1');
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner_2} alt="banner" className="banner_img" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Banner_3}
            alt="banner"
            className="banner_img"
            onClick={() => {
              navigate('/banner3');
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner_4} alt="banner" className="banner_img" />
        </SwiperSlide>
      </Swiper>
    </Banner_Container>
  );
};

export default Banner;

const Banner_Container = styled.section`
  position: relative;
  .banner_img {
    width: 100%;
  }
  // Swiper
  /* Container */
  .swiper {
    width: 100%;
    height: 100%;
    position: initial;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    width: auto;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-pagination {
    position: absolute;
    bottom: -25px;
    z-index: 10000;
  }
  .swiper-pagination-bullet {
    background: #6d71b6;
  }
  .swiper-pagination-bullet-active {
    background: #ffffff;
  }
`;
