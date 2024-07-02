import React from "react";
import CartLogo from '../../assets/CartImage.png'

// import {CategoryCarousel, OffersCarousel} from "../../components";


import { CartItems } from "../../components";
import {Container, CartImg} from './style'


export function Cart(){
    return(
        <Container>
        <CartImg src={CartLogo} alt="logo do carrinho" />
        <CartItems></CartItems>
        </Container>
    )
}
