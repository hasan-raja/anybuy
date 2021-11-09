import React, { useState, } from "react";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, } from "./helper/cartHelper";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckOut = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  // const userName =isAuthenticated() && isAuthenticated().user.name;


  const getFinalPrice = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };

  const makePayment = () => {
    const body = { token, products };
    const headers = { "Content-Type": "application/json" };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("status", status);
        const orderData={
          products:products,
          name:response.name,
          transaction_id:response.transaction.id,
          amount:response.transaction.amount
        }
        console.log(orderData);
        createOrder(userId,token,orderData)
        cartEmpty(()=>{
          console.log("is there a crash");
        })
        setReload(!reload)
        ///
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_STRIPE_API_KEY}
        token={makePayment}
        amount={getFinalPrice() * 100}
        name='Buy product'
        shippingAddress
        billingAddress>
        <button className='btn btn-success'>Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-warning'>Signin</button>
      </Link>
    );
  };
  return (
    <div>
      <h1 className='text-white'> OR</h1>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckOut;
