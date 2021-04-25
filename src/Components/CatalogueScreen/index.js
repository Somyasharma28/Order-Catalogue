import React, { useState } from 'react';
import './style.css';
import { Button, Card, CardBody } from 'reactstrap';
import Header from '../Header';
import CartPageScreen from '../CartPageScreen';

const CatalogueScreen = (props) => {
    const { data } = props;
    const [cartData, setCartData] = useState([]);
    const [error, setError] = useState("");
    const [showProductPage, setShowProductPage] = useState(true);
    const [searchProduct, setSearchProduct] = useState("");
    const [category, setCategory] = useState("");

    const addToCart = (itemId) => {
        let flag = false;
        const newItem = data[itemId];
        cartData.forEach((item) => {
            if (item.id === newItem.id) {
                flag = true;
            }
        });

        if (flag) {
            setError("Product is already present in cart");
        } else {
            const currData = cartData;
            currData.push(newItem);
            setCartData([...currData]);
            setError("");
        }
    }

    const removeProduct = (id) => {
        const currData = cartData;
        currData.splice(id, 1);
        setCartData([...currData]);
        setError("");
    }

    return <div>
        {
            showProductPage ?
                <><Header cartdata={cartData} ProductPage={setShowProductPage} searchProduct={setSearchProduct}
                    setCategory={setCategory}
                />

                    <div className="error">{
                        error.length === 0 ? null : error
                    }</div>
                    <div className="cataloguesmain">
                        {
                            data.filter((item) => {
                                if (category.length === 0 && searchProduct.length === 0)
                                    return true
                                else if (category.length > 0 && searchProduct.length === 0) {
                                    return item.category === category
                                } else if (category.length === 0 && searchProduct.length > 0) {
                                    return item.name.toUpperCase().includes(searchProduct.toUpperCase()) ||
                                        item.brand.toUpperCase().includes(searchProduct.toUpperCase())
                                } else {
                                    return item.category === category &&
                                        (item.name.toUpperCase().includes(searchProduct.toUpperCase()) ||
                                            item.brand.toUpperCase().includes(searchProduct.toUpperCase()))
                                }

                            }).map((item, idx) => {
                                return <Products name={item.name} price={item.price}
                                    img={item.img} key={`_${idx}_`} brand={item.brand}
                                    id={idx}
                                    addToCartHandler={addToCart}
                                />
                            })
                        }
                        {
                            console.log(searchProduct, category)
                        }
                    </div></>
                :
                <>
                    <CartPageScreen data={cartData} ProductPage={setShowProductPage}
                        removeProductHandler={removeProduct}
                        setCartData={setCartData}
                    />
                </>
        }
    </div>


};


const Products = (props) => {
    const { name, price, img, brand, id, addToCartHandler } = props;

    const addCart = () => {
        addToCartHandler(id);
    }

    return <div className="product"><Card>
        <CardBody>
            <img src={img} className="productImage" alt="Product"></img>
            <h4> {name} <br /> {brand}</h4>
            <h4>{'INR'} {price}</h4>
            <Button color="warning" onClick={addCart}>Add to Cart</Button>
        </CardBody>
    </Card></div>

}

export default CatalogueScreen;