import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link,Redirect} from "react-router-dom";
import { getaCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [name, setname] = useState("");
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  const [redirect,setRedirect]=useState(false)

  const preload = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      if (data.error) {
        // seterror(true);
      } else {
        setname(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    seterror("");
    setname(event.target.value);
  };

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    seterror("");
    setsuccess(false);
    setRedirect(false)

    updateCategory(match.params.categoryId, user._id, token, {name}).then(
      (data) => {

        if (data.error) {
          seterror(true);
        } else {
          seterror("");
          setsuccess(true);
          setRedirect(true)
         
        }
      }
    );
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    >
      <h4> updated successfully</h4>
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-warning mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>error while updating </h4>
    </div>
  );

  const performRedirect = () => {
    if (success && redirect ) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/categories" />;
      }// } else {
      //   return <Redirect to="/user/dashboard" />;
      // }
    }
    
  };
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange()}
          value={name}
          autoFocus
          required
          placeholder="For ex.winter"
        />
        <button className="btn btn-outline-info" onClick={onSubmit}>
          Update category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {performRedirect()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
