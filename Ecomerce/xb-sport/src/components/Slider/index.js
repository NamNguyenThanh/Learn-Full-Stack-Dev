import { useEffect, useState, useLayoutEffect } from 'react';

const sliderImages = require.context('../../assets/images/sliders', true);

export default function Slider({ data }) {
  const [slide, setSlide] = useState(0);
  const updateDimensions = () => {
    // this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  const nextSlide = () => {
    setSlide((prevSlide) => (prevSlide + 1) % data.length);
  };

  const prevSlide = () => {
    setSlide((prevSlide) => (prevSlide - 1) % data.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div className="slider-container">
      <div onClick={prevSlide} className="arrow arrow-left">
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      {data.map((item, index) => {
        return (
          <img
            key={index}
            src={sliderImages(`./${item.src}`)}
            alt={item.alt}
            className={slide === index ? 'slide' : 'slide slide-hidden'}
          />
        );
      })}
      <div onClick={nextSlide} className="arrow arrow-right">
        <i class="fa-solid fa-arrow-right"></i>
      </div>
      <span className="indicators">
        {data.map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSlide(index);
              }}
              className={slide === index ? 'indicator' : 'indicator indicator-inactive'}
            ></div>
          );
        })}
      </span>
    </div>
  );
}
