import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/User.js";

export const registerUsers = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    const newUser = new userModel(user);

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const loginUsers = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
 
    if (req.body.userId === req.params.id || req.body.isAdmim) {
      if (req.body.password) {
        try {
          const salt = await bcypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          console.log(error);
        }
      }
      try{
          const user = await userModel.findByIdAndUpdate(req.params.id, {$set: req.body});
          res.status(201).json("Account has been updated");
      }
      catch(error){
        console.log(error);

    } 
    }else{
        res.status(403).json("You can only update your account");
  }   
  
};

export const deleteUser = async (req, res) => {
 
    if (req.body.userId === req.params.id || req.body.isAdmim) {
      try{
          const user = await userModel.findByIdAbdDelete(req.params.id);
          res.status(201).json("Account has been deleted");
      }
      catch(error){
        console.log(error);

    } 
    }else{
        res.status(403).json("You can only delete your account");
  }   
  
};

export const getUser = async (req, res) =>{

  const userId = req.query.userId;
  const username = req.query.username;
    try{
      const user = userId ? await userModel.findById(userId): await userModel.findOne({username:username})
      const { password, updatedAt, ...other } = user._doc
      return res.status(200).json(other);
    }catch(error){
        console.log(error)
    }
}

export const getFriends = async (req, res) => {
  try{

    const user = await userModel.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId)=>{
        return userModel.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend)=>{
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  }
  catch(err){
    res.status(500).json(err);
  }
}

export const followUser = async (req, res) => {
   if(req.body.userId !== req.params.id){
       try{
         const user = await userModel.findById(req.params.id);
         const currentUser = await userModel.findById(req.body.userId);
         if(!user.followers.includes(req.body.userId)){
             await user.updateOne({$push: {followers: req.body.userId}});
             await currentUser.updateOne({$push: {followings: req.params.id}});
             res.status(200).json("User has been followed");
         }
         else{
             res.status(403).json("You already followed this Account");
         }
       }
       catch(error){
          res.status(403).json(err);
       }
   }
   else{
       res.status(403).json("You cant follow yourself");
   }
}

export const unFollowUser = async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
          const user = await userModel.findById(req.params.id);
          const currentUser = await userModel.findById(req.body.userId);
          if(user.followers.includes(req.body.userId)){
              await user.updateOne({$pull: {followers: req.body.userId}});
              await currentUser.updateOne({$pull: {followings: req.params.id}});
              res.status(200).json("User has been unfollowed");
          }
          else{
              res.status(403).json("You dont follow this user");
          }
        }
        catch(error){
           res.status(403).json(err);
        }
    }
    else{
        res.status(403).json("You cant unfollow yourself");
    }
 }
 
