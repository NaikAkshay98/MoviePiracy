import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/HeroSection.css'; 

const HeroSection = () => {
  const [banners, setBanners] = useState([]); 

  useEffect(() => {
    const fetchBanners = async () => {
      
      const response = await fetch('/db.JSON');
      const data = await response.json();
      setBanners(data.banners); 
    };

    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  
  return (
    <div className="hero-section">
      <Slider {...settings}>
        {banners?.map((banner, index) => ( 
          <div key={index} className="hero-slide">
            <img src={banner.image} alt={banner.title} />
            
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
