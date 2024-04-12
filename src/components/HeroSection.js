import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/HeroSection.css'; 

const HeroSection = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Replace the local fetch call with a call to your endpoint
        const response = await axios.get('https://moviepiracy-3b45209c39bf.herokuapp.com/api/banners');
        setBanners(response.data); // Assuming the response data is an array of banners
      } catch (error) {
        console.error('Error fetching banners:', error);
        // Handle error, possibly setting an error state or displaying a message
      }
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
        {banners.map((banner, index) => ( // Remove the optional chaining if you're sure the data is always an array
          <div key={index} className="hero-slide">
            <img src={banner.image} alt={banner.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
