import React, { createContext, useContext, useEffect, useState } from 'react'  

import PropTypes from 'prop-types'
const CartContext = createContext({})

export const CartProvider = ({children}) =>{
 const [cartProducts, setCartProducts] = useState({})

 const putProductInCart = async product =>{
    
 }
 useEffect( ()=> {
 const loadUserData = async()=>{
    const clientCartData = await localStorage.getItem('codeburger:cartInfo')

    if(clientInfo){
        setCartProducts(JSON.parse(clientCartData))
    }
    
 }
 loadUserData()
 },[])


    return(
        <CartContext.Provider value={{putProductInCart,cartProducts}}> {children} </CartContext.Provider>
    )
}

    export const useCart = () =>{
        const context = useContext(CartContext)

        if(!context){
            throw new Error("useCart must be used with UserContext")
        }
        return context
    }

    CartProvider.PropTypes = {
        children: PropTypes.node
    }
