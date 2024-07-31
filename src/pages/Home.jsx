import React from 'react';
import NavbarComponent from '../Components/Home/Navbar';
import Footer from '../Components/Home/Footer';
import CarouselComponent from '../Components/Home/Courusel';
import Info from '../Components/Home/Info';

const Home = () => {
    return (
        <div style={{height:"100hv"}}>
            <NavbarComponent/>
            <CarouselComponent/>
            <Info/>
            <Footer/>
        </div>
    );
}

export default Home;
