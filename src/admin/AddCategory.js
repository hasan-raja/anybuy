import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setname] = useState("");
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    seterror("");
    setname(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    seterror("");
    setsuccess(false);

    //backend
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        seterror(true);
      } else {
        seterror("");
        setsuccess(true);
        setname("");
      }
    });
  };

  const successMessage=()=>{
    if(success){
        return <h4 className="text-success">Category created successfully</h4>
    }
  }

  const warningMessage=()=>{
    if(error){
        return <h4 className="text-warning">Failed to create Category</h4>
    }
  }

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For ex.winter"
        />
        <button className="btn btn-outline-warning" onClick={onSubmit}>
          Create category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a Category here"
      description="add a new category"
      className="container bg-dark p-5"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
