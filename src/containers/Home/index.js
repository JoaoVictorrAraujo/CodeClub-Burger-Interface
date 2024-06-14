import React from "react";
import HomeLogo from '../../assets/home-logo.png'
import CategoryCarousel from "../../components/CategoryCarousel";
import {Container, HomeImg} from './style'

function Home(){
    return(
        <Container>
        <HomeImg src={HomeLogo} alt="logo da home" />
        <CategoryCarousel></CategoryCarousel>
        </Container>
    )
}
export default Home