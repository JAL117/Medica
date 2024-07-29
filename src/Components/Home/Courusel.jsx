import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from "../../img/banner-natura.jpg"
import img2 from "../../img/medicaNatura(fondo).jpg"

const CarouselComponent = () => {
  const carouselStyle = {
    maxHeight: '500px', 
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: '500px', 
    objectFit: 'cover'
  };

  return (
    <Carousel style={carouselStyle} className='mt-5'>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img}
          alt="First slide"
          style={imageStyle}
        />
     
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
          style={imageStyle}
        />
    
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={""}
          alt="Third slide"
          style={imageStyle}
        />
  
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;