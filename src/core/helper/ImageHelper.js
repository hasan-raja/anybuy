import React from "react";
import { API } from "../../backend";


const ImageHelper = ({ product}) => {
  
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className='bg-dark rounded border border-secondary p-2'>
      <img
        src={imageurl}
        // width="320" height="320"
        onError={(e)=>{e.target.onerror = null; e.target.src='https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'}}
        alt='photo loading '
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className='border border-info mb-3 rounded'
      />
    </div>
  );
};

export default ImageHelper;
