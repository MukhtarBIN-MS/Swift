import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
      email:{
          type:String,
          required:true,
          max:50,
          unique:true
      },
      password:{
          type:String,
          required:true,
          
      },
      profilePicture:{
          type:String,  
          default:"" 
      },
      coverPicture:{
        type:String,  
        default:""
      },
      followers:{
         type:Array,
         default:[]
      },
      followings:{
        type:Array,
         default:[]
      },
      isAdmin:{
          type:Boolean,
          default:false
      },
      desc:{
          type:String,
          max:50
      },
      city:{
          type:String,
          max:50,
      },
      country:{
        type:String,
        max:50,
    },
    occupation:{
        type:String,
        max:50,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},
{timestamps:true}
);

const userModel = mongoose.model('UserModel', userSchema);

export default userModel;