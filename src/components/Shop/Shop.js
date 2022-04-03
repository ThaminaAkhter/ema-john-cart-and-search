import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useproducts';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useProducts();
    // const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // useEffect( () =>{
    //     console.log('products load before fetch')
    //     fetch('products.json')
    //     .then(res=> res.json())
    //     .then(data => setProducts(data));
    //     console.log('products loaded')
    // }, []);

    useEffect(() => {
        console.log('local storage first line', products)
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                //console.log(addedProduct);
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);

            }
        }
        setCart(savedCart);
        //console.log(storedCart);
        console.log('local storage finished')
    }, [products])

    const handleAddToCart = (Selectedproduct) => {
        console.log(Selectedproduct);
        let newCart = [];
        const exists = cart.find(product => product.id === Selectedproduct.id);
        if (!exists) {
            Selectedproduct.quantity = 1;
            newCart = [...cart, Selectedproduct];
        }
        else {
            const rest = cart.filter(product => product.id !== Selectedproduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        // do not do this: cart.push(product);

        setCart(newCart);
        addToDb(Selectedproduct.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/orders'>
                        <button>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;