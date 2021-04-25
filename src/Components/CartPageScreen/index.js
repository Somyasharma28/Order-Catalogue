import React, { useState } from 'react';
import './style.css';
import { Button, Navbar, NavbarBrand } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Checkout from '../ChekoutScreen';


const CartPageScreen = (props) => {
    const { data, removeProductHandler, setCartData } = props;
    const [checkoutScreen, setCheckoutScreen] = useState(false);
    return <div>
        <div><NavigationBar ProductPage={props.ProductPage} /></div>
        <div className="cartProducts">
            {
                data.map((item, idx) => {
                    return <Products name={item.name} price={item.price}
                        img={item.img} key={`_${idx}_`}
                        id={idx}
                        removeProductHandler={removeProductHandler}
                    />
                })
            }
            {
                data.length > 0
                    ?
                    !checkoutScreen ? <Button color="success" onClick={() => setCheckoutScreen(true)}>Check Out</Button>
                        :
                        <Checkout data={data} show={true} setCheckoutScreen={setCheckoutScreen}
                            setCartData={setCartData} />
                    :
                    <h5 className="error">{"No product present in Cart"}</h5>
            }
        </div>
    </div>
}

const Products = (props) => {
    const { name, price, img, id, removeProductHandler } = props;

    const removeProduct = () => {
        removeProductHandler(id);
    }

    return <div className="product">
        <h5>{`${id + 1} - `}</h5>
        <img src={img} className="CartImage" alt="Product"></img>
        <h5> {name} {' INR'} {price}</h5>
        <FontAwesomeIcon icon={faTrashAlt} color="red" onClick={removeProduct} className="deleteItem"></FontAwesomeIcon>
    </div>

};


const NavigationBar = (props) => {
    const productPageHandler = (event, flag) => {
        event.preventDefault();

        props.ProductPage(flag);
    }
    return <Navbar color="dark" dark>
        <NavbarBrand onClick={(event) => { productPageHandler(event, true) }}>Order Catalogue</NavbarBrand>
    </Navbar>
}



export default CartPageScreen;
