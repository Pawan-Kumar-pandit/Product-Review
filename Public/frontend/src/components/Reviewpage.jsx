import React from 'react'
import './reviewpg.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from'axios'
import Swal from "sweetalert2";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {FaStar} from "react-icons/fa"
import socket from "../socket";
// import { connection } from 'mongoose'

// import { FaBeer } from "react-icons/fa";
const Reviewpage = () => {
    let [review, setReview] = useState({
        name: "",
        rating:"",
        comments: ""
      });
      const navigate= useNavigate();
    // let [star,setStar]=useState();
    // let [editing, setEditing]= useState(false);
    // let [revId ,setRevId]=useState("");
    let revId;
    let rate = 0;
    let [user, setUser]= useState({});
    let [ cvstar, setCvstar]= useState(0);
    const [ hoverstar, setHoverstar]= useState(undefined);
    // for start coloring
    const color ={
      orange:"#FFBA5A",
      grey:"#a9a9a9"
    }
  // for socket connection
  
    // socket.emit("custom-event",1211 , user.name);
    

// for edting time 
const handleOnclick=value=>{
  setCvstar(value);
  console.log(value);
}
const handlemouseohover=value=>{
  setHoverstar(value);
}
const handlemouseleave=()=>{
setHoverstar(undefined)
}

const getUser = async() =>{
  const { data } = await axios.get("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtlogin")}`,
    },
  });
    console.log(data.user._id);
  setUser(data.user);
};

useEffect(()=>{
  if(localStorage.getItem("Editing")){
      Editdetail();
  }
  socket.on("connect",()=>{
    // alert("conneted");
    console.log(1110);
  })
  getUser();
},[])

let Editdetail=async()=>{
  revId= localStorage.getItem("Editing")
  // console.log(revId);  
  
  let { data, status } =await axios.get(`/api/feedback/Review/${revId}`,{headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwtlogin")}`,
  }});
  // console.log(data.Rev);
  console.log(230);
  setReview(data.Rev)
  setCvstar(data.Rev.rating);
  console.log(cvstar);
  
  // console.log(data);
}

const star = Array(5).fill(0);


let validate= async (e)=>{
    e.preventDefault();
    review.rating= cvstar;
    // console.log(10)
    // console.log(review.header);
    // console.log(review.comments);
    // console.log(review.star);
    // console.log(10);
    console.log(review);
    if (review.name.length < 6 ) {
        alert('Please enter a review with at least 6 characters.');
      } else if (review.rating < 1 || review.rating > 5) {
        alert('Please select a rating between 1 and 5.');
      } 
      else{
        //  for editing part 
        if(localStorage.getItem("Editing")){
          let revId=localStorage.getItem("Editing")
          console.log(revId);
          let { data, status } =await axios.post(`/api/feedback/${revId}`, review,{headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtlogin")}`,
          }});
          localStorage.removeItem("Editing");
          if(status ==201){
            Swal.fire("Review Edited Succesfully successful","", "success");
            navigate("/home")
          }
          else{
            Swal.fire("Someting went Wrong","", "error");
  
          }
        }
        // for creating part 
        else{
          // let { data, status } =await axios.post("/api/feedback", review,{headers: {
          //   "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("jwtlogin")}`,
          // }});
            
          // let status=201;
          socket.emit("send-name", user.name)
          let status = 200;
          if(status ==200){
            Swal.fire("Review created successful","", "success");
            navigate("/home")
          }
          else{
            Swal.fire("Someting went Wrong","", "error");

          }
        }
        
      }

}
let updateinput=(e)=>{
    // console.log(e.target.value);
setReview({...review, [e.target.name] : e.target.value,});
console.log(review);
}


  return (
    <> 
   <div id='Newtop'>

    <section id="new-review " className=''>

      <form id="review-form" className='bg-113' onSubmit={validate}>
        <label htmlFor="name"><h3>Name:</h3></label>
        <input required className='bg-113' type="text" id="name"  name="name"value={review.name}  onChange={updateinput} />


<div className='d-flex mt-4 mb-4 gap-3' >
<div>
<h3>Rating : </h3>
</div>

<div className=''>
  {star.map((_, index)=>{
    return (
   <FaStar key = {index}
   size={30}
   color={(hoverstar||cvstar)>index?color.orange:color.grey}
   onClick={()=>handleOnclick(index+1)}
   onMouseOver={()=>handlemouseohover(index+1)}
   onMouseLeave={handlemouseleave}
   />    )
  })}
</div>

</div>
  
        <label htmlFor="comments"><h3> Comments: </h3></label>
        <textarea id="comments" rows="4"  name ="comments"value={review.comments} onChange={updateinput} required></textarea>

        <button type="submit" id="submit-btn">Submit</button>
      
      </form >
    </section>
   </div>

    </>
  )
}

export default Reviewpage