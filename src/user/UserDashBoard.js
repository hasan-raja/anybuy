
import React,{useState,useEffect} from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { getaUser } from "./helper/userapicalls";

const UserDashBoard = () => {
  const {
    user: { name, email,_id},token
  } = isAuthenticated();
const [uname, setname] = useState(name);
const [uemail, setemail] = useState(email)
  const preload = (userId,token) => {
    getaUser(userId,token).then((data) => {
        // console.log(data);
      if (data.error) {
        // seterror(true);
      } else {
        setname(data.name);
        setemail(data.email);
      }
    });
  };

  useEffect(() => {
    preload( _id,token );
  }, []);

  const userLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-warning text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/user/dashboard" className="nav-link text-success">
              User profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/user/update/${_id}`} className="nav-link text-success">
              Update user profile
            </Link>
          </li>
          
        </ul>
      </div>
    );
  };

  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header text-warning">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge text-success mr-2">Name:</span> {uname}
          </li>
          <li className="list-group-item">
            <span className="badge text-success mr-2">Email:</span> {uemail}
          </li>

          <li className="list-group-item">
            <span className="badge text-danger">User Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to user area"
      description="Manage your profile  here"
      className="container bg-dark p-4"
    >
      <div className="row">
        <div className="col-3">{userLeftSide()}</div>
        <div className="col-9">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
