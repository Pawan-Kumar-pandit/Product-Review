import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {

const navigate= useNavigate();
let [reviewTy, setReviewty] = useState(true)
let [transferpg, setTransferpg]= useState({})
let [user ,setUser]= useState({});
var ava=30;



let Changereviewtype=()=>{
    setReviewty(!reviewTy);
    if(reviewTy){
      setTransferpg("home")
    }
    else{
      setTransferpg("myreview")
    }
}


const getUser = async() =>{
  const { data } = await axios.get("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtlogin")}`,
    },
  });
  setUser(data.user);
  console.log(data.user.avatar);
  

}

useEffect(()=>{

  if(localStorage.getItem("Editing")){
    localStorage.removeItem("Editing");
  }
  if(localStorage.getItem("jwtlogin")){
    getUser();
  }


      console.log(10);
  },[])


let Settingout=()=>{
localStorage.removeItem("jwtlogin");
if(localStorage.getItem("Editing")){
  localStorage.removeItem("Editing")
}
navigate("/");

}

  let beforeLogin = (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </React.Fragment>
  );

  let afterLogin = (
    <React.Fragment>
       <li className="nav-item">
      
        <Link to="/" className="nav-link">
          <img
            src={user.avatar}
            alt=""
            width="25"
            height="25"
            className="rounded-circle"
          />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          {/* <i className="fa fa-sitemap" />  */}
          Profile
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/home" className="nav-link">
          <i className="fa fa-list" /> Home 
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/Myreview" className="nav-link">
          {/* <i className="fa fa-list" />  */}
          Review
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={Settingout}>
          logout
          {/* <span>{ava}</span> */}
        </Link>
      </li>

    </React.Fragment>


  );

  return (
   <React.Fragment>
      <nav className="navbar fixed-top navbar-dark bg-dark navbar-expand-sm"
      style={{
        zIndex:'0'
      }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="fa fa-code" /> Feedbacks
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
            className="navbar-toggler-icon ">

          <i className="fa-solid fa-bars"></i>
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav">
            <li className="nav-item">
        <Link to="/home" className="nav-link" onClick={Changereviewtype}>
        <i class="fa-solid fa-address-book"></i>  {reviewTy ?<span>All Review</span>:<span>My Reviews</span>}
        </Link>
      </li>
            </ul> */}
            <ul className="navbar-nav ml-auto">
              {localStorage.getItem("jwtlogin") ? afterLogin : beforeLogin}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default Navbar