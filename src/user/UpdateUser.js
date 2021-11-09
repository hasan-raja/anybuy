import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import {  Redirect } from "react-router-dom";
import { getaUser,updateaUser } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";

const UpdateUser = ({match}) => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        error:false,
        success:false,
        redirect:false,
    })

    const {name,email,error,success,redirect}=values;


  const { user, token } = isAuthenticated();
  // const userID=user._id;
  // console.log(match.params.userId);
  const preload = (userId,token) => {
    getaUser(userId,token).then((data) => {
        // console.log(data);
      if (data.error) {
        setValues({error:data.error})
      } else {
        setValues({...values,name:data.name,email:data.email})
      }
    });
  };

  useEffect(() => {
    preload( match.params.userId,token );
  }, [redirect]);

  const handleChange = name=>(event) => {
      setValues({...values,error:"", [name]: event.target.value})
    
  };

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
        error:'',
        success:false,redirect:false
    })
   

    updateaUser( match.params.userId, token, {name,email}).then(
        
      (data) => {
        if (data.error) {
          setValues({...values,error:data.error})
        } else {
            setValues({
                error:'',
                success:true,redirect:true
            })
        }
      }
    );
  };

  const successMessage = () => (
    <div
      className='alert alert-success mt-3'
      style={{ display: success ? "" : "none" }}>
      <h4> updated successfully</h4>
    </div>
  );

  const errorMessage = () => (
    <div
      className='alert alert-warning mt-3'
      style={{ display: error ? "" : "none" }}>
      <h4>error while updating </h4>
    </div>
  );

  const performRedirect = () => {
    if (success && redirect ) {
      if (user && user.role === 0) {
        return <Redirect to="/user/dashboard" />;
      }// } else {
      //   return <Redirect to="/user/dashboard" />;
      // }
    }
}

  const updateUserForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label className='text-light'>Name</label>
              <input
                className='form-control'
                onChange={handleChange('name')}
                type='text'
                value={name}
              />
            </div>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                className='form-control'
                onChange={handleChange('email')}
                type='email'
                value={email}
              />
            </div>

            {/* <div className="form-group">
                <label className="text-light">Password</label>
                <input
                  onChange={handleChange("password")}
                  className="form-control"
                  type="password"
                  value={password}
                />
              </div> */}
            <button onClick={onSubmit} className='btn btn-success btn-block'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base
      title='User profile update page'
      description='A page for user to update!'>
      {successMessage()}
      {errorMessage()}
      {updateUserForm()}
      {performRedirect()}
      {/* <p className='text-white text-center'>{JSON.stringify(name,email)}</p> */}
    </Base>
  );
};

export default UpdateUser;
