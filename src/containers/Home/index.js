import React from "react";
import HomeLogo from '../../assets/home-logo.png'

import {CategoryCarousel, OffersCarousel} from "../../components";



import {Container, HomeImg} from './style'


export function Home(){
    return(
        <Container>
        <HomeImg src={HomeLogo} alt="logo da home" />
        <CategoryCarousel></CategoryCarousel>
        <OffersCarousel></OffersCarousel>
        </Container>
    )
}
