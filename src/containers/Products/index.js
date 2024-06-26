import React, { useEffect, useState } from "react";
import ProductsLogo from '../../assets/Products-Logo.png'
import api from "../../services/api";

import {CardProduct} from "../../components";
import formatCurrency from '../../utils/formatCurrency'
import { Container, ProductsImg, CategoryButton, CategoriesMenu, ProductsContainer } from './style'


export function Products() {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState(0)
    useEffect(() => {

        async function loadCategories() {
            const { data } = await api.get('categories')

            const newCategories = [{ id: 0, name: 'Todos' }, ...data]

            setCategories(newCategories)
        }


        async function loadProducts() {
            const { data:allProducts } = await api.get('products')
            
            const newProdutcts = allProducts.map(product => {
                return {...product, formatedPrice: formatCurrency(product.price)}
            })

            setProducts(newProdutcts)
        }

        loadCategories()
        loadProducts()
    }, [])


useEffect( () => {
    if(activeCategory===0){
        setFilteredProducts(products)
    }else{
    const newFilteredProducts = products.filter (product => product.category_id ===activeCategory)

    setFilteredProducts(newFilteredProducts)
}
}, [activeCategory,products] )

    return (
        <Container>
            <ProductsImg src={ProductsLogo} alt="logo de products" />
            <CategoriesMenu>
                {categories &&
                    categories.map(category => (
                        <CategoryButton
                            type='button'
                            key={category.id}
                            isActiveCategory={activeCategory === category.id}
                            onClick={() => {
                                setActiveCategory(category.id)
                            }}
                        >
                            {category.name} </CategoryButton>
                    ))}
            </CategoriesMenu>
            <ProductsContainer>
                {filteredProducts && filteredProducts.map(product => (
                    <CardProduct key={product.id} product={product} />
                ))}


            </ProductsContainer>
        </Container>
    )
}
