import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllOrders } from "./helper/adminapicall";


const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = (userId, token) => {
    getAllOrders(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  

  useEffect(() => {
    preload(user._id, token);
  }, []);

  return (
    <Base title='Welcome admin' description='Manage products here'>
      <h2 className='mb-4'>All Orders</h2>
      <Link className='btn btn-info' to={`/admin/dashboard`}>
        <span className=''>Admin Home</span>
      </Link>
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center text-white my-3'>{`Total ${orders.length} Order`}</h2>
          {orders.map((order, index) => {
            const products = order.products;
            const createddate = order.createdAt.toString().split("T");
            return (
              <div key={index} className='row text-center mb-2 '>
                <div className='col-6'>
                  <div className='row'>
                    <div className='col-6'>
                      <h3>Ordered by {order.name}</h3>
                    </div>
                    <div className='col-6'>
                      <h3>{createddate[0]}</h3>
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='row'>
                    <div className='col-6'>
                      <h3>
                        <span className='bg-warning text-white text-left'>
                          Amount
                        </span>{" "}
                        : {order.amount}
                      </h3>
                    </div>
                    <div className='col-6'>
                      <h3 className='text-white text-left'>STATUS :
                        <span className='bg-success text-white text-left'>{order.status}</span>
                            
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Orders;
