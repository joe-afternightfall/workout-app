import React from 'react';
import Slider from 'react-slick';

export default function VerticalCarouselDemo(): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    vertical: true,
  };
  return (
    <div style={{ width: '80%' }}>
      <Slider {...settings}>
        <div style={{ background: 'red' }}>
          <h3>1</h3>
        </div>
        <div style={{ background: 'green' }}>
          <h3>2</h3>
        </div>
        <div style={{ background: 'orange' }}>
          <h3>3</h3>
        </div>
        <div style={{ background: 'pink' }}>
          <h3>4</h3>
        </div>
        <div style={{ background: 'grey' }}>
          <h3>5</h3>
        </div>
        <div style={{ background: 'aqua' }}>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}
