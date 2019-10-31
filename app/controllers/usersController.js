const express=require('express')
//sconst router=express.Router()
const { User} =require('../models/users')
//const {authenticateUser}=require('../middleware/authenticate')

// localhost/users/register
module.exports.register=function(req,res){
    const body=req.body
    const user=new User(body)
    console.log(user.isNew)
    // console.log(body)
   
    user.save()
    
        .then((user)=>{
            const{_id,username,email}=user
            res.json({_id,username,email})
        })
        .catch((err)=>{
            res.send(err)
        })

}

//localhost /users/login

module.exports.login=(req,res)=>{
    const body=req.body
    User.findByCredentials(body.email,body.password) //
            .then((user)=>{
               return user.generateToken() // alternate way is sessions

            })
            .then((token)=>{
                res.setHeader('x-auth',token).send({})
            })
            .then((token)=>{
                res.send(token)
            })
            .catch((err)=>{ 
                res.send(err)
            })  
}

// //localhost/users/account
// router.get('/accounts',authenticateUser,(req,res)=>{
//     const {user}=req
//     res.send(user)

// })

//localhost/users/logout

module.exports.logout=(req,res)=>{
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})  // $pull mongodb method
        .then(()=>{
            res.send({notice:'successfully logout'})
        })
}

// module.exports={
//     usersRouter:router
//  }
