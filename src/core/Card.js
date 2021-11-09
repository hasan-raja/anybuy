import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  //   function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product.name ? product.name : "name missing";
  const cartDescrption = product.description
    ? product.description
    : "description missing";
  const cartPrice = product.price ? product.price : 0;

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className='btn btn-block btn-outline-success mt-2 mb-2'>
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className='btn btn-block btn-outline-danger mt-2 mb-2'>
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div
      className='card text-white bg-white border border-info '
      style={{
        width: removeFromCart ? "14rem" : "none",
      }}>
      <div className='card-header lead text-dark'>{cartTitle}</div>
      <div className='card-body'>
        
        <ImageHelper product={product} />
        
        <p className='lead bg-success font-weight-normal text-wrap m-3'>
          {addtoCart && cartDescrption}
        </p>
        <p className='btn btn-warning rounded  btn-sm px-4'>$ {cartPrice}</p>
        <div className='row'>
          <div className='col-12'>{showAddToCart(addtoCart)}</div>
          <div className='col-12'>{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
