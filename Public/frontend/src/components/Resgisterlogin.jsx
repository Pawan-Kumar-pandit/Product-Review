import React, { useState } from 'react'
import "./login.css"
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Resgisterlogin = () => {

   const navigate = useNavigate();

    let [user,setUser] = useState({
        email:"",
        password:""
    })

    let [userError, setUserError] = useState({
        emailError: "",
        passwordError: "",
      });

      let colorbody=()=>{
        let body = document.querySelector('body')
        body.style.background = 
       "linear-gradient(to right, " 
       + "#660000"
       + ", " 
       + "#cc0000"
       + ", " 
       + "#660000"
       + ")";
      }
      useEffect(()=>{
        colorbody();
        // ReviewSorting();
        },[])
        


      let validateEmail = (event) => {
        setUser({ ...user, email: event.target.value });
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value)
          ? setUserError({ ...userError, emailError: "Enter a proper Email" })
          : setUserError({ ...userError, emailError: "" });
      };

      let validatePassword = (event) => {
        setUser({ ...user, password: event.target.value });
        if (event.target.value.trim() == "")
          setUserError({ ...userError, passwordError: "Enter a proper Password" });
        else setUserError({ ...userError, passwordError: "" });
      };

     let submitlogin =async(e)=>{
        e.preventDefault();

          console.log(user);

          if (user.email !== "" && user.password !== "") {
            let email=user.email;
            let password = user.password;
         const {status,data}=await axios.post('/api/users/login',{email,password},{
            headers:{
              "Content-Type":"application/json"
            }
          })
          if(status==201){
            Swal.fire("Invalid credentials","", "error");
          }else if(status==200){
             Swal.fire("Login successful","", "success");
             localStorage.setItem("jwtlogin", data.token);
             navigate("/home");
          }
          
        } else {
          Swal.fire("Oh no!", "Something went wrong! Try again", "error");
        }
          


     }


  return (
    <>
  <section className="vh-100">
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 text-black">

        <div className="px-5 ms-xl-4 mt-4">
          <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" ></i>
          <span className="h1 fw-bold ">Feedback</span>
        </div>

        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

          <form  id='formc' onSubmit={submitlogin} >

            <h3 className="fw-normal mb-3 pb-3"  id='lettersps'>Log in</h3>

            <div className="form-outline mb-4">
                <small>Email address</small>
              <input type="email" id="form2Example18" className={`form-control border-bottom border-4 form-control-lg
              `}
              name="email"
              onChange={validateEmail}
              value={user.email}

              /> 
             {
                user.email.length>0?
                <small>
                      
              {userError.emailError.length > 0 ? (
                    <small className="text-danger">
                      {userError.emailError}
                    </small>
                  ) : (
                    ""
                  )}
                </small>:
                ""
             }
            
              {/* <label className="form-label" for="form2Example18">Email address</label> */}
              
            </div>

            <div className="form-outline mb-4">
                <small>Password</small>
              <input type="password" id="form2Example28" value={user.password} 
              onChange={validatePassword}
              name="password"
              required
              className={`form-control border-bottom border-4 form-contrl-lg`}/>
               
                           {userError.passwordError.length > 0 ? (
                    <small className="text-danger">
                      {userError.passwordError}
                    </small>
                  ) : (
                    ""
                  )}
                  
              {/* <label className="form-label " for="form2Example28">Password</label> */}

            </div>
            <div className="pt-1 mb-4">
              <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
            </div>

            <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
            <p>Don't have an account?  <Link to ="/register" className="link-info">Register here</Link></p>

          </form>

        </div>

      </div>
      <div className="col-sm-6 px-0 d-none d-sm-block">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
          alt="Login image" className="w-100 vh-100" id='imgafit' />
      </div>
    </div>
  </div>
</section>
    
    
    </>
  )
}

export default Resgisterlogin