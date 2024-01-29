const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


///////////////////////////////////////////////////////////////////////// for registration 
router.post('/', [    
    body('name', 'Enter a valid ame').isLength({ min: 4 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must have at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;

    if (!errors.isEmpty()) {
        return res.json({ successn, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ success, errors: [{ msg: "This user already exists" }] });
        }

        const myPass = req.body.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPass, salt);

        user = await User.create({
            name: req.body.name,
            password: hash,
            email: req.body.email,
        });

        const data = {
            user: {
                id: user.id
            }
        };
        success = true;
        const token = jwt.sign(data, JWT_SECRET);

        delete user.password;
        
        res.json({ success,user});
    } catch (error) {
        console.error("Something went wrong");
        res.status(500).json({ success: false, error: error.message });
    } 
});
module.exports = router;



/////////////////////////////////////////////////////////////////////  for login 
router.post('/login', [    
  // validating the name ,email and password.
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should not be blank').exists(),
  ], async (req, res) => {
  
    // CHECKING FOR INFORMATION ENTERED BY THE USER
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
   
    try{
         
      //  destructuring of ther request
      const {email,password}=req.body;
      
      let user=await User.findOne({email})
      if(!user){
          return res.status(400).json({success,message:"Such user does not exists"});
      }

   
      const passCompare=await bcrypt.compare(password,user.password);
      if(!passCompare)
      {

        res.status(400).json({success,error:"Please enter the correct credetials"});
        
      }
      const data={
        user:{
            id:user.id
        }
      }
      delete user.password;
      const token=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,user})
      
    }catch(error){
      console.error("something went wrong")
      res.status(500).json({error:error.message})
    }

  })
