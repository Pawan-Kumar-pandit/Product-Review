import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import axios from'axios'

const Initialpage = () => {
  const[user, setUser]= useState()
  let userid;

  const getUser = async() =>{
    const { data } = await axios.get("/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtlogin")}`,
      },
    });
    
      console.log(data.user._id);
      // console.log(userid);
       setUser(data.user.name);
   
  };

    useEffect(()=>{
      console.log(10000)
        if(localStorage.getItem("Editing")){
          localStorage.removeItem("Editing");
        }
            console.log(10);
          if(localStorage.getItem("jwtlogin")){
            getUser();}
        // fetchReviews();
        },[])
        
  return (
    <>

      <div className="landing-page">
        <div className="wrapper">
          
          <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
            
            <h4 className=" animated zoomIn"></h4>
             {localStorage.getItem("jwtlogin")?
            <h5 className="display-4 animated zoomIn">Welcome {user}  to Our  Review and Rating System </h5>
            : <h5 className="display-4 animated zoomIn">Review and Rating System </h5>
            
            
            }
            
            <p className="animated zoomIn">
              A website for to  Giv your review on products , update
              Reviews and to see other people review about a certain product 
            </p>
            {localStorage.getItem("jwtlogin") ? (
              <div className="animated jello">
                <Link
                  to="/"
                  className="btn btn-danger btn-sm text-white me-5"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="animated jello">
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm text-white me-5"
                >
                  Register
                </Link>
                <Link to="/login" className="btn btn-success btn-sm">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    





    </>
  )
}

export default Initialpage