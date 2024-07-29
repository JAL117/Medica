import React from 'react';
import NavbarComponent from '../Components/Home/Navbar';
import Footer from '../Common/Footer';
import CarouselComponent from '../Components/Home/Courusel';

const Home = () => {
    return (
        <div>
            <NavbarComponent/>
            <CarouselComponent/>
            <Footer/>
        </div>
    );
}

export default Home;
