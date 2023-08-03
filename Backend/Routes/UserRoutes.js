const express= require("express");
const router = express.Router();
const bcrypt =require("bcryptjs");
const User =require("../models/user")
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authenticate")


// usage : to register a user 
// url : "/api/users/register"
// access :public  

router.post("/register", async(req, res)=>{
    try{
        let {name , email , password, Gender, Dob} =  req.body;
        // let password = Account.password
        // let email = Account.email
        // console.log(10)
        // console.log(email);
        // console.log(name);
        // console.log(password);
        // console.log(Dob);
        // console.log(gender);
        let user = await User.findOne({email: email})
        console.log(user)
        if (user) {

            return res.status(201).json({ msg: "User already Exists" });
          }

        let secret = await bcrypt.genSalt(10);  
        console.log(secret);
         password = await bcrypt.hash(password, secret) ;
        console.log(password);
        console.log(30);
        let avatar =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOkHm3_mPQ5PPRvGtU6Si7FJg8DVDtZ47rw&usqp=CAU";       
        Newuser = new User({name , email , password , avatar ,Gender , Dob  });
        await Newuser.save();
        res.status(200).json({msg: "Registration is Sucessfull"})
        // console.log(20);
    }
    catch(error){
        console.error(error);
      res.status(500).json({ errors: [{ msg: error.message }] });
    }

});


/*
    @usage : to Login a User
    @url : /api/users/login
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */

router.post("/login", async(req,res)=>
{
try{
    let { email, password } = req.body;

    // check if the correct email
    let user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(201)
        .json({ errors: [{ msg: "wrong Credentials" }] });
    }

    // check the password
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(201)
        .json({ errors: [{ msg: "Invalid Credentials" }] });
    }
   let payload = {
      user: {
        id: user.id,
        name: user.name,
      },
    };
  jwt.sign(payload, process.env.JWT_SECRET_KEY, (error, token) => {
      if (error) throw error;
      res.status(200).json({
        msg: "Login is Success",
        token: token,
      });
    });

}
 catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }

});

// @usage :  to get user Info
//     @url : /api/users/me
//     @fields : no-fields
//     @method : GET
//     @access : PRIVATE

router.get("/me", auth, async(req, res)=>{
try{
let user = await User.findById(req.user.id).select("-password");
console.log(100);
res.status(200).json({
  user: user,
});
}
catch(error){

  console.error(error);
  res.status(500).json({ errors: [{ msg: error.message }] });
}


})




module.exports = router;