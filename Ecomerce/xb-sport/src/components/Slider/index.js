import { useState } from 'react';

const sliderImages = require.context('../../assets/images/sliders', true);

export default function Slider({ data }) {
  const [slide, setSlide] = useState(0);
  const nextSlide = () => {
    setSlide(slide + 1 === data.length ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide - 1 < 0 ? data.length - 1 : slide - 1);
  };

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
