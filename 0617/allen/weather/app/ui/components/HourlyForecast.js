import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HourlyForecast = ({ forecast }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!forecast || forecast.length === 0) {
    return <div className="animate-pulse">Loading hourly forecast...</div>;
  }

  return (
    <div className="hourly-forecast">
      <h2 className="text-center text-lg font-bold mb-4">每小时天气预报</h2>
      <Slider {...settings}>
        {forecast.map((item, index) => (
          <div key={index} className="forecast-item p-2">
            <div>{new Date(item.dt * 1000).getHours()}h</div>
            <div>{Math.round(item.main.temp - 273.15)}°C</div>
            <div className="justify-center items-center flex">
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt="icon"
                className="justify-center items-center"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HourlyForecast;
