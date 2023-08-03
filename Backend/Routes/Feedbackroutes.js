const express = require("express");
const router = express.Router();
const Feedback= require("../models/Feedback")
const User=require("../models/user");
const auth = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
// creating a new Review
router.post("/", auth , async(req, res)=>{
try{
    const review = req.body;
    const user = req.user.id; 
    // console.log(user);
    // console.log(review);
    // console.log(10);
    if(!review.name || !review.rating){
        res.status(400).json({
            error:'Title and content are required fields.' });
        return 
    }
   let NewReview ={
    user: user,
    name:  review.name,
    rating :review.rating,
    comments: review.comments
   } 
   let Fb= new Feedback(NewReview); 
   await Fb.save();
   res.status(200).json({ message:'Review submitted successfully!' });
}
catch(error){
    console.error(error);
      res.status(500).json({ errors: [{ msg: error.message }] }); 
}
});


// getting a review 
router.get("/",auth, async(req, res)=>{
    try{

       let sort =  req.query.sortBy;
       let filter = req.query.filter || 6;
       let search= req.query.searchby||"";
    //    console.log(filter);
    //    console.log(sort);
    //    console.log(search);
       let feedback = await Feedback.find();
       if(!feedback){
        return res.status(200).json({ errors: [{ msg: "No  Review Found" }] })
       }
        
       req.query.sortBy ?(sort=req.query.sortBy.split(",")):(sort=[sort])

    //    console.log(sort);
       let sortB={};
       if(sort[1]){
        sortB[sort[0]]=sort[1];
       }
       else{
        if(sort[0]=='rating'){
        sortB[sort[0]]="desc";}

        else{
            sortB[sort[0]]="asc";}
       }
        filter= parseInt(filter);
    //    console.log(sortB);
    //    console.log(typeof(filter));
    //    console.log(10);

    //    pagination data
      const page = req.query.page*1||1;
    //   console.log(page);
      const limit = req.query.limit*1||3;
      const skip= (page-1)*limit;  
    //   console.log(feedback.length);
      let total ;
// console.log(filter);
       if(filter!=6){  
       feedback= await Feedback.find({name:{$regex:search,$options:"i"}})
       .where("rating").equals(filter).skip(skip).limit(limit);
   
       }
       else{
       feedback= await Feedback.find({name:{$regex:search,$options:"i"}})
       .skip(skip).limit(limit);
       }
    //   
    //    feedback.sort(sortB);
    // console.log(filter);
      feedback.map((fed)=>{
        console.log(fed.name);
      })


        
       res.status(201).json({ feedback:feedback , total:total });
       
    }
    catch(error){
        console.error(error);
        res.status(500).json({ errors: [{ msg: error.message }] }); 
    }
})



// get a review by its user Id
router.get("/:userId",auth, async(req, res)=>{
    try{
    //    console.log(userId);
       let userId = req.params.userId;
       console.log(100);
       console.log(userId);
       let sort =  req.query.sortBy;
       let filter = req.query.filter || 6;
       let search= req.query.searchby||"";
    //    console.log(filter);
    //    console.log(sort);
    //    console.log(search);
       let feedback = await Feedback.find({user:userId});
       if(!feedback){
        return res.status(200).json({ errors: [{ msg: "No  Review Found" }] })
       }
       console.log(feedback.length);
        
       req.query.sortBy ?(sort=req.query.sortBy.split(",")):(sort=[sort])

    //    console.log(sort);
       let sortB={};
       if(sort[1]){
        sortB[sort[0]]=sort[1];
       }
       else{
        if(sort[0]=='rating'){
        sortB[sort[0]]="asc";}

        else{
            sortB[sort[0]]="asc";}
       }
        filter= parseInt(filter);
    //    console.log(sortB);
    //    console.log(typeof(filter));
    //    console.log(10);

    //    pagination data
      const page = req.query.page*1||1;
      const limit = req.query.limit*1||3;
      const skip= (page-1)*limit;  
    //   console.log(skip);
        console.log(filter);
       if(filter!=6){  
       feedback= await Feedback.find({user:userId,name:{$regex:search,$options:"i"}})
       .where("rating").equals(filter).skip(skip).limit(limit).sort(sortB);
   
       }
       else{
       feedback= await Feedback.find({user:userId,name:{$regex:search,$options:"i"}})
       .skip(skip).limit(limit).sort(sortB);;
       }

       


    
    // console.log(filter);
    //   console.log(feedback);
        
       res.status(201).json({ feedback:feedback });
       
    }
    catch(error){
        console.error(error);
        res.status(500).json({ errors: [{ msg: error.message }] }); 
    }
})










// get the rreview by it id 
router.get("/Review/:RevId", auth , async(req,res)=>{
    try{
    let revId = req.params.RevId;
    console.log(10);
    let Rev = await Feedback.findById(revId);
    // console.log(Rev);
    if(!Rev){
        return res.status(201).json({
            msg: "Your Review is not found",
          });

    }   

    // res.status(200).json({
    //     msg: "Your Review is Deleted",
    //   });

        res.status(200).json({
            Rev:Rev,
          });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
    
    })

router.post("/:RevId", auth , async(req, res)=>{
        try{

            let revId = req.params.RevId;
            console.log(revId);            
            let Rev = await Feedback.findById(revId);
            console.log(revId);
            if(!Rev){
                return res.status(201).json({
                    msg: "Your Review is not found",
                  });
            }
            const review = req.body;
            const user = req.user.id; 
            if(!review.name || !review.rating){
                res.status(400).json({
                    error:'Title and content are required fields.' });
                return 
            }

           let NewReview ={
            user: user,
            name:  review.name,
            rating :review.rating,
            comments: review.comments
           } 
            console.log(10002);
            console.log(NewReview);

           Rev= await Feedback.findOneAndUpdate(
             {_id : revId},
             {$set:NewReview},
             {new:true}
           );
           console.log(Rev);
           res.status(201).json({ message:'Review submitted successfully!' });
        }
        catch(error){
            console.error(error);
              res.status(500).json({ errors: [{ msg: error.message }] }); 
        }
        });





//edit a review 






// To delete a review 

router.delete("/:RevI",auth, async(req, res)=>{
try{
    let RevId =  req.params.RevI;
    // console.log(RevId);
    // console.log(10);

    let Rev = await Feedback.findById(RevId);
    console.log(Rev);
    if(!Rev){
        return res.status(201).json({
            msg: "Your Review is not found",
          });
    }
    Rev =await Feedback.findByIdAndRemove(RevId);
    
    res.status(200).json({
        msg: "Your Review is Deleted",
      });

}
catch(error){
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
}
})


module.exports = router;