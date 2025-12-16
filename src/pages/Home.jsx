import React, {} from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Sliders from '../Component/Sliders';
import LatestBooksSection from '../Component/LatestBooksSection';
import CoverageSection from '../Component/CoverageSection';
import WhyChooseSection from '../Component/WhyChooseSection';
import AnimatedDelivery from '../Component/AnimatedDelivery';
import Testimonials from '../Component/testimonials';

const Home = () => {

    return (
        <div className="p-6 min-h-[60vh] flex flex-col  justify-center">
            <Sliders></Sliders>
            <LatestBooksSection></LatestBooksSection>
            <CoverageSection></CoverageSection>
            <WhyChooseSection></WhyChooseSection>
            <AnimatedDelivery></AnimatedDelivery>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;
