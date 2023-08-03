import React from 'react'
// import "./login.css"
// import "./regi.css"
import { useState } from 'react';
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from 'react';
import Sideimage from "./newPhoto.jpg"
import { useNavigate } from 'react-router-dom';

const Registration = () => {

   const navigate= useNavigate();

    let [user,setUser] = useState({
        name:"",
        email:"",
        gender:"",
        Dob:"",
        password:""
    })

    let [userError, setUserError] = useState({
        emailError: "",
        passwordError: "",

      });

      let validateCre = (e) => {
        setUser({...user , [e.target.name]:e.target.value}) 
        console.log(e.target.name);
        console.log(e.target.value);
       
      };

      let validateEmail = (event) => {
        setUser({ ...user, email: event.target.value });
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value)
          ? setUserError({ ...userError, emailError: "Enter a proper Email" })
          : setUserError({ ...userError, emailError: "" });
      };

      let validatePassword = (event) => {
        setUser({ ...user, password: event.target.value });
           console.log(user)

        if (event.target.value.trim() == "")
          setUserError({ ...userError, passwordError: "Enter a proper Password" });
        else setUserError({ ...userError, passwordError: "" });
      };
      let colorbody=()=>{
        let body = document.querySelector('body')
        body.style.background ="#cc0000" 
      //  "linear-gradient(to right, " 
      //  + "#660000"
      //  + ", " 
      //  + "#cc0000"
      //  + ", " 
      //  + "#660000"
      //  + ")";
      }
      useEffect(()=>{
        colorbody();
        // ReviewSorting();
        },[])
        


      let submitRegistration= async(event)=>{
        event.preventDefault();
        if (
          user.name[0].trim() !== "" &&
          user.email.trim() !== "" &&
          user.password.trim() !== ""
        ) {
          
        let name = user.name[0].trim();
        let email = user.email.trim();
        console.log(name);
        let password = user.password.trim();
        let Dob= user.Dob[0];
        let Gender= user.gender[0];
        console.log(user.name);
        console.log(10);
        const { status } = await axios.post(
            "/api/users/register",
            { name , email , password , Gender, Dob},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

        if (status == 201){
          Swal.fire("User already exists","", "error");
          return;
        }else if(status == 200){
           Swal.fire("Registration successful","", "success");
           navigate("/login");
        } 

        
      }





        }





  return (
    <>
    
  <section className="vh-100">
  <div className="container-fluid">
    <div className="row">
    <div className="col-sm-6 px-0 d-none d-sm-block  border border-4">
        <img src={Sideimage}
          alt="Login image" className="w-100 vh-100  " id='' />
      </div>


      <div className="col-sm-6 text-black border border-3">

        <div className="px-5 mt-4">
          <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" ></i>
          <span className="h1 fw-bold "> Feedbacks 
            
    
          </span>
        </div>

        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-1 pt-5 pt-xl-0 mt-xl-n5 ">

          <form  id='formc' onSubmit={submitRegistration} >

            <h3 className="fw-normal mb-2 pb-3"  id='lettersps'>Registration</h3>

            <div className="form-outline mb-3">
                    <small>Name</small>
                  <input type="text" name='name'  className="form-control border-bottom border-2 " 
                  value={user.name}
                 onChange={validateCre}
                  />
                </div>
            
            <div className="form-outline mb-4">
                <small>Email address</small>
              <input type="email" id="form2Example18" className={`form-control border-bottom  border-2
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
            
              {/* <label class="form-label" for="form2Example18">Email address</label> */}  
            </div>

<div className="d-md-flex justify-content-start align-items-center mb-2 py-2">
<h6 className="mb-0 me-4">Gender: </h6>

<div className="form-check form-check-inline mb-0 me-4">
  <input className="form-check-input" type="radio" name="gender" id="femaleGender"
    value="Female" onChange={validateCre}/>
  <label className="form-check-label" htmlFor="femaleGender">Female</label>
</div>

<div className="form-check form-check-inline mb-0 me-4">
  <input className="form-check-input" type="radio" name="gender" id="maleGender"
    value="Male"  onChange={validateCre}/>
  <label className="form-check-label" htmlFor="gender">Male</label>
</div>

<div className="form-check form-check-inline mb-0">
  <input className="form-check-input" type="radio" name="gender" id="otherGender"
    value="Other" onChange={validateCre} />
  <label className="form-check-label" htmlFor="otherGender">Other</label>
</div>

</div>
<div className="form-outline mb-4">
                    <small>DOB</small>
                  <input type="date"  onChange={validateCre} name='Dob' value={user.Dob}className="form-control  border-bottom border-2 form-control-lg" />
                  {/* <label className="form-label" for="form3Example9">DOB</label> */}
                </div>

            <div class="form-outline mb-4">
                <small>Password</small>
              <input type="password" id="form2Example28" value={user.password} 
              onChange={validatePassword}
              name="password"
              required
              className={`form-control border-bottom border-2 form-contrl-lg`}/>
               
                           {userError.passwordError.length > 0 ? (
                    <small className="text-danger">
                      {userError.passwordError}
                    </small>
                  ) : (
                    ""
                  )}



                  
              {/* <label class="form-label " for="form2Example28">Password</label> */}
               


            </div>

            <div className="d-flex justify-content-end pt-3">
                  <button type="reset" className="btn btn-light btn">Reset all</button>
                
                  <button type="submit"  className="btn btn-warning btn ms-2">Register</button>
                </div>
                

          
          </form>

        </div>

      </div>      
    </div>
  </div>
</section>




    </>
  )
}

export default Registration