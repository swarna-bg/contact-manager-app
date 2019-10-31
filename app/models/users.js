const mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

const Schema=mongoose.Schema

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
       
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'Invaild email format'
            }
           
        }
    },
    password:{
        type:String,
       required:true,
        minlength:6,
        maxlength:128
    },
    tokens:[
        {
            token:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
})


//pre hooks
userSchema.pre('save',function(next){
    const user=this  // never use arrow function bz his should refer the object
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(function(salt){
            bcryptjs.hash(user.password,salt)
                .then(function(encryptedPassword){
                    user.password=encryptedPassword
                    next()  //it goes to save method
                })
        }) 
    }else{
        next()
    }
    

})

// pre init
// pre validate
// pre save
// pre remove


//own static method

userSchema.statics.findByCredentials=function(email,password){
    const User=this
        return User.findOne({email})
            .then(function(user){
                if(!user){
                    return Promise.reject({
                        errors:'invalid email or password'
                    })
                }
                return bcryptjs.compare(password,user.password)// it extracts th same salt value and generate the same encrypted password
                    .then(function(result){
                        if(result){
                            return Promise.resolve(user)
                        }else{
                            return Promise.reject({
                            errors:'invalid email or password'
                        })
                        }
                    })
            })
            .catch(function(err){
                return Promise.reject(err)
            })

}

// find by token

userSchema.statics.findByToken= function(token){
    const User=this
    let tokenData
    try{   /// run time error handle
        tokenData = jwt.verify(token,'jwt@123')
    }catch(err){
        return Promise.reject(err)
    }

    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
}

//own  instance method

userSchema.methods.generateToken=function(){
    const user=this
    const tokenData={
        _id:user._id,
        username:user.username,
        createdAt:Number(new Date())
    }

    const token=jwt.sign(tokenData,'jwt@123')
    user.tokens.push({
        token
    })

    return user.save()
        .then(function(user){
            return Promise.resolve(token)
        })
       
        .catch(function(err){
            return Promise.reject(err)
        })
}

const User=mongoose.model('User',userSchema)

module.exports={
    User
}
 