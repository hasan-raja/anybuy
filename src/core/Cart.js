import React, { useState, useEffect } from "react";
import "../styles.css";
// import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckOut from "./StripeCheckOut";
import Paymentb from "./PaymentB";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div className="d-flex row">
        <h2>{`There ${products.length === 1 ? "is " : " are "} ${
          products.length
        } product in cart`}</h2>
        {products.map((product, index) => (
          
          <Card className="d-flex flex-wrap bg-info"
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title='Cart Page' description='Ready to checkout'>
      <div className='row text-center'>
        <div className='col-6 bg-info'>
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No product in cart</h3>
          )}
        </div>
        
          <div className='col-6'>
            
            <div className='row'>
              <Paymentb products={products} setReload={setReload} />
              <h6 className="text-warning">Recommended way</h6>
            </div>
            <div className='row'>
              <StripeCheckOut products={products} setReload={setReload} />
            </div>
          </div>
       
      </div>
    </Base>
  );
};

export default Cart;
