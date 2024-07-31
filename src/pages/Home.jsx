import React from 'react';
import NavbarComponent from '../Components/Home/Navbar';

import CarouselComponent from '../Components/Home/Courusel';
import ServicesComponent from '../Components/Home/Servicescompoent';
import Info from '../Components/Home/Info';
import TestimonialsComponent from '../Components/Home/TestimoniosComponent';
import LocationSection from '../Components/Home/LocationSetion';
import Footer from '../Components/Home/Footer';


function App() {
  return (
    <>
      <NavbarComponent />
  
      <CarouselComponent />
      <ServicesComponent />
      <Info />
      <TestimonialsComponent />
      <LocationSection />
      <Footer />
    </>
  );
}

export default App;