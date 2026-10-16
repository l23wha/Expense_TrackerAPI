  require('dotenv').config();
const express=require('express');
 const jwt=require('jsonwebtoken');
  const bcrypt=require('bcryptjs')
const { default: mongoose, mongo } = require('mongoose');

 const app=express();
 app.use(express.json());
 const PORT=process.env.PORT||3000;
 const JWT_SECRET=process.env.JWT_SECRET;

 const UserSchema= new mongoose.Schema({
       name:{type:String,required:true},
       email:{type:String,required:true,unique:true},
      password:{type:String,required:true}
 },{timestamps:true});

 const expenseSchema=new mongoose.Schema({
       
         userId:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'User',
              required:true,
              index:true
         },
         title:{type:String,required:true},
         amount:{type:Number,required:true},
         category:{type:String,required:true},
         date:{type:Date,default:Date.now}
 },{timestamps:true});

 const User=mongoose.model('User',UserSchema);
 const Expenses=mongoose.model('Expenses',expenseSchema);

 app.post('/sign-up',async (req,res)=>{
    try{
         const {name,email,password}=req.body;
          if(!name || !email || !password){
             return res.status(400).json({error:"All fields are required"});
          }

            const alreadyExist= await User.findOne({email});
             if(alreadyExist){
                  return res.status(400).json({message:"User already exist"});
             }

              const salt=await bcrypt.genSalt(10);
               const hashedPassword=await bcrypt.hash(password,salt);
          
          const newUser=new User({
             name:name,
             email:email,
             password:hashedPassword
          });
          const saved=await newUser.save();
             return res.status(200).json(saved);
    }catch(err){
          console.error(err);
          return res.status(500).json({message:"Internal Server error"});
    }
 });

 app.post('/login',async (req,res)=>{
      try{
         const {email,password}=req.body;
          if(!email || ! password){
              return res.status(400).json({error:"All fields are required"});
          }

          const user=await User.findOne({email});
           if(!user){
              return res.status(400).json({error:"email or password is incorrect"});
           }

           const isMatched=await bcrypt.compare(password,user.password);
           if(!isMatched){
              return res.status(403).json({error:"Please provide a correct password"});
           }

           const token=jwt.sign(
             {id:user._id,email:user.email},
                   JWT_SECRET,
                   {expiresIn:'1d'}
             
           )

            return res.status(201).json({
                   message:"Login successfully",
                   token:token
            });
         
      }catch(err){
         console.error(err);
          return res.status(500).json({message:"Internal Server error"});
      }
 });




 app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
 });







 