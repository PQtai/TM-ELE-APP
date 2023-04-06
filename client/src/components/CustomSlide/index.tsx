import React, { ReactNode } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

interface SliderCustomProps {
   children: ReactNode;
   customSetting?: {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      autoplay?: boolean;
      autoplaySpeed?: number;
   };
}

const SliderCustom = ({ children, customSetting }: SliderCustomProps) => {
   const settings: SliderCustomProps['customSetting'] = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      ...customSetting,
   };
   return (
      <div className="slider">
         <Slider {...settings}>{children}</Slider>
      </div>
   );
};

export default SliderCustom;
