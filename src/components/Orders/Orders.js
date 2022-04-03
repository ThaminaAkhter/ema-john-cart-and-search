import React from 'react';
import { useNavigate } from 'react-router-dom';
///import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useproducts';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'

const Orders = () => {
    const[products,setProducts]=useProducts();
    const[cart,setCart]=useCart(products);
    const navigate=useNavigate();
    const handleRemoveProduct=(product)=>{
        const rest=cart.filter(pd=>pd.id!==product.id);
        setCart(rest);
        removeFromDb(product.id);
    }
    return (
        <div>
            <div className='shop-container'>
                 <div className='review-item-container'>
                   {
                       cart.map(product=><ReviewItem
                       key={product.id}
                       product={product}
                       handleRemoveProduct={handleRemoveProduct}
                       >

                       </ReviewItem>)
                   }
                 </div>
                 <div className='cart-container'>
                     <Cart cart={cart}>
                         <button onClick={()=>navigate('/inventory')}>Procceed Checkout</button>
                        {/* <Link to='/inventory'>
                            <button>Procceed Checkout</button>
                        </Link>  */}
                     </Cart>
                 </div>
            </div>
        </div>
    );
};

export default Orders;