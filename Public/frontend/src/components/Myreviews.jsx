import React from 'react'
import { useState } from 'react'
import axios from'axios'
import { useEffect } from 'react'
import "./home.css"
import Swal from "sweetalert2" 
import { Link, Navigate, useNavigate } from 'react-router-dom'


const Myreviews = () => {
  
  const [review , setReview]= useState([]);
  const[loading, setLoading] = useState(true);
  const navigate= useNavigate();
  // let [sortvalue, setSortvalue]= useState()
  let [searchname, setSearchname]=useState("")
  let sortvalue="date";
  let filters= "6";
  let [pvstate, setPvstate] = useState({
    sortby:"date",
    filter:"6"

  })
  let [currentpage, setCurrentpage]= useState(1);
  const[pagelimit, setPagelimit]= useState(5);
  let count=0;
let [user, setUser]= useState({});
let userid;
let [usedid, setUsedid]= useState(undefined);

const getUser = async() =>{
  const { data } = await axios.get("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtlogin")}`,
    },
  });
  // console.log(data);
    userid = data.user._id;
    console.log(data.user._id);
    console.log(userid);
  setUser(data.user);
  setUsedid(data.user._id)
//   console.log(user);
};



const fetchReviews = async(pgno) =>{

// console.log(currentpage);
filters= pvstate.filter;
sortvalue=pvstate.sortby;
// console.log(21000);
// console.log(user);
// console.log(usedid);
if(usedid!=undefined){
  console.log(900)
  userid=usedid;
}

console.log(userid)
const { data}= await axios.get(`/api/feedback/${userid}?searchby=${searchname}&sortBy=${sortvalue}&filter=${filters}&page=${pgno}`,
{headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("jwtlogin")}`,
    },});

// console.log(data)
console.log(user);
setReview(data.feedback)
// console.log(data);
};

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
if(localStorage.getItem("Editing")){
localStorage.removeItem("Editing");
}
  console.log(10);
  if(!localStorage.getItem("jwtlogin")){
   
    Navigate("/")
}


count=0;
setCurrentpage(1);
getUser().then(()=>{
  fetchReviews();
})

// ReviewSorting();
},[])

// to get the time difference

function timeDifference(current, previous) {
var msPerMinute = 60 * 1000;
var msPerHour = msPerMinute * 60;
var msPerDay = msPerHour * 24;
var msPerMonth = msPerDay * 30;
var msPerYear = msPerDay * 365;

var elapsed = current - previous;

if (elapsed < msPerMinute) {
  if (elapsed / 1000 < 30) return "Just now";

  return Math.round(elapsed / 1000) + " seconds ago";
} else if (elapsed < msPerHour) {
  return Math.round(elapsed / msPerMinute) + " minutes ago";
} else if (elapsed < msPerDay) {
  return Math.round(elapsed / msPerHour) + " hours ago";
} else if (elapsed < msPerMonth) {
  return Math.round(elapsed / msPerDay) + " days ago";
} else if (elapsed < msPerYear) {
  return Math.round(elapsed / msPerMonth) + " months ago";
} else {
  return Math.round(elapsed / msPerYear) + " years ago";
}
}

let createdtime=(current)=>{
let day= current.getDay()
let month=current.getMonth()+1
let year=current.getFullYear()
let today=current.getDate();
const options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};
// console.log(current.toLocaleDateString("en-US", options));
let ans=(current.toLocaleDateString("en-US", options));

return  ans;
}


let DeleteReview=async(RevId)=>{
  console.log(localStorage.getItem("jwtlogin"))
const { data } = await axios.delete(`/api/feedback/${RevId}`, {
 headers: {
   "Content-Type": "application/json",
   Authorization:`Bearer ${localStorage.getItem("jwtlogin")}`,
 },
});
fetchReviews();
Swal.fire("Review deleted successfully", "", "success");
};


let EditReview=async(RevId)=>{
  console.log(RevId);
  localStorage.setItem("Editing",RevId);
  navigate("/createReview")
}

const ReviewSorting = async(e, pgno) =>{
   // console.log(e.target.value);
  //  console.log(e.target.name);
  setPvstate({...pvstate,[e.target.name]:[e.target.value]})
 
if(e.target.name=='sortby'){
sortvalue = e.target.value;
filters = pvstate.filter[0]; 
}
if(e.target.name=='filter'){
filters = e.target.value ;
sortvalue= pvstate.sortby[0];
}
setCurrentpage(1);
// console.log(sortvalue)
// console.log(filters);
userid=user._id ;
// console.log(userid);
let{data} = await axios.get(`/api/feedback/${userid}?searchby=${searchname}&sortBy=${sortvalue}&filter=${filters}&page=${pgno}`,{headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("jwtlogin")}`,
}});  
setReview(data.feedback);
setSearchname("");
}
const resetall=()=>{

fetchReviews();
setSearchname("");
}


// const paginationpart


const nextpage=()=>{
if(review.length<3 ) return 

setCurrentpage(currentpage+1);
console.log(currentpage);
// fetchReviews(currentpage+1);
fetchReviews(currentpage+1)
}
const prevpage=()=>{
if(currentpage==1) return ;
setCurrentpage(currentpage-1);
fetchReviews(currentpage-1);
}





return (
  <>
  <div className='' id='topmargin'>

<section className='mt-4' >
<div >
<div className='m-2 ' >
<h2 className='text-center '>My Review and Rating</h2>
</div>


<section className='m-3'>

<div className='m-4 '>
<div className="input-group mb-3 ">
<input type="text" className="form-control text-center border border-3" placeholder="Search A review" aria-label="Recipient's username" aria-describedby="button-addon2"
value={searchname}

onChange={(e)=>setSearchname(e.target.value)}

/>
<button className="btn btn-outline-secondary border border-3 "
 type="submit" id="button-addon2"
 onClick={ReviewSorting}
 >
  
<i class="fa-solid fa-magnifying-glass  "></i>

</button>
<button className="btn btn-outline-secondary border border-3 "
 type="submit" id="button-addon2"
 
 onClick={resetall}
 >
  
{/* <i class="fa-solid fa-magnifying-glass  me-2"></i> */}
<i class="fa-solid fa-rotate-right"></i>
</button>


</div>

</div>


</section>


<div className='
d-flex
flex-wrap
gap-3
ms-3'>
  <div className='btn btn-primary m-2 ms-4'>
  <label htmlFor="sort-by" className='btn'>Sort By:</label>
  <select className="btn" id='sort-by'  name="sortby" onChange={ReviewSorting} >
  
  <option value="createdAt">Date</option>
  <option value="rating">rating</option>

</select>
  </div>
  <div className='float'> 
      
  <div className='btn btn-primary m-2  '>
<label htmlFor="text-center" className='btn'>Rating:</label>
<select id="rating-filter" 

name = "filter" className='btn btn-primary ' onChange={ReviewSorting}>
  <option value="6">All Ratings</option>
  <option value="5">5 stars</option>
  <option value="4">4 stars </option>
  <option value="3">3 stars </option>
  <option value="2">2 stars </option>
  <option value="1">1 star </option>
</select>
</div>
  </div>
</div> 
</div>
</section>



<hr />




<section className='m-3'>

  
  <Link to = "/createReview" className='nav-link'>
  <div className='m-3' id="adding">
      <div>
      <h5 className='gap-2'>
      <i class="fa-solid fa-circle-plus"></i>
         Add a review</h5>
      </div>
  </div>
  </Link>


  </section>

<section className=''>
 
{review.slice(0).reverse().map((rev)=>{
return (     
<div  key = {rev._id}>
  {rev.user==user._id ? 
   <div className="card m-4 "  >
   <div className=" ">
      <span className='d-none'>{count++}</span>
     <ul className="list-group ">
       <li className="list-group-item bg-111">
         NAME : <span className="fw-bold">{rev.name}</span>
         <button className='btn btn-danger float-end' onClick={
           DeleteReview.bind(this,rev._id)
       }> Delete</button>
         <button className='btn btn-warning float-end me-2' onClick={EditReview.bind(this,rev._id)}>Edit</button>

       </li>
       <li className="list-group-item">
         Rating : 
     {/* // whole rating system */}
          {
           rev.rating==5?
           <>
             <i className="fa-solid fa-star"></i>
             <i className="fa-solid fa-star"></i>
             <i className="fa-solid fa-star"></i>
             <i className="fa-solid fa-star"></i>
             <i className="fa-solid fa-star"></i>
           </>
           : rev.rating==4 ? 
           <>
               <i className="fa-solid fa-star"></i>
               <i className="fa-solid fa-star"></i>
               <i className="fa-solid fa-star"></i>
               <i className="fa-solid fa-star"></i>

           </>:
           rev.rating==3?<>
               <i className="fa-solid fa-star"></i>
               <i className="fa-solid fa-star"></i>
               <i className="fa-solid fa-star"></i>

           </>: rev.rating==2?
           <>
               <i className="fa-solid fa-star"></i>
               <i className="fa-solid fa-star"></i>

           </>: rev.rating==1?<>
           <i className="fa-solid fa-star"></i>
           </>
           :""
          }
         
       </li>
       <li className="list-group-item">
         Comments : <span>{rev.comments}</span>
       </li>
       {/* <li class="list-group-item">Company : {data.company}</li> */}
       
       <li className="list-group-item">
         <small > 
           Date :
               <span className='ms-2'>
               {createdtime(new Date(rev.createdAt))}
               </span>
             
               
           </small> 

           <small className='float-end'>
           {timeDifference(
                    new Date(),
                 new Date(rev.createdAt)
                               )}
           </small>
       </li>
     </ul>
   </div>
 </div>
  : " "
   }  
</div>
)
})
}
</section>
{count===0&& currentpage>1?<h2 className='text-center bg-secondary h-1 m-3'>There are no more Review</h2>:count==0
?<div className='text-center bg-secondary h-4 m-3'>You havenot given any review</div>
:""

}


 

{/* pagination page  */}

<section>
 <nav aria-label="Page navigation example">
<ul class="pagination justify-content-center">
  <li class="page-item ">
    <button className='btn m-2 bg-113'
    
    onClick={prevpage}
    
    >Prev</button>
  </li>
  <li class="page-item btn m-2 bg-113">{currentpage}</li>
  <li class="page-item bg-113 m-2">
    <button className='btn'
    onClick={nextpage}
    >Next</button>
  </li>
</ul>
</nav>
 </section>
 {/* {renderpagination()} */}


 </div>

  </>
)

}

export default Myreviews