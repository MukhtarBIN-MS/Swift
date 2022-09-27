import mongoose from 'mongoose';
import userModel from '../models/User.js';
import postModel from '../models/Post.js';

export const createPost = async (req, res) => {
    const newPost = new postModel(req.body);

    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch(error){
        cosnsole.log(error);
    }

}

export const updatePost = async (req, res) =>{
    try{
        const post = await postModel.findById(req.params.id);
        if(post.userId === req.body.userId){
          await postModel.updateOne({$set:req.body});
          res.status(200).json("Post has been updated");
        }else{
          res.status(403).json("You can only update your post");
        }
    }
    catch(error){
        console.log(error);
    }
}

export const deletePost = async (req, res) =>{
    try{
        const post = await postModel.findById(req.params.id);
        if(post.userId === req.body.userId){
          await postModel.deleteOne();
          res.status(200).json("Post has been deleted");
        }else{
          res.status(403).json("You can only delete your post");
        }
    }
    catch(error){
        console.log(error);
    }
}

export const likePost = async (req, res) =>{
    try{
        const post = await postModel.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
          await post.updateOne({ $push: { likes: req.body.userId}});
          res.status(200).json("This post has been liked");
        }else{
          await post.updateOne({$pull: {likes: req.body.userId}});
          res.status(200).json("This post has been disliked");
        }
    }
    catch(error){
        console.log(error);
    }
}

export const getPost = async (req, res) =>{
    try{
     const post = await postModel.findById(req.params.id);
     res.status(200).json(post);
     
    }
    catch(error){
        console.log(error);
    }
}

export const getTimeline = async (req, res) => {
    
    try{
        const currentUser = await userModel.findById(req.params.userId);
        const userPosts = await postModel.find({ userId: currentUser._id});
        const friendPost = await Promise.all(
            currentUser.followings.map((friendId)=>{
               return postModel.find({ userId: friendId}); 
            })
        );
         res.json(userPosts.concat(...friendPost))
    }
    catch(error){
        console.log(error);
    }
}

export const getUserPost = async (req, res) =>{
    try{
    const user = await userModel.findOne({ username: req.params.username})
     const post = await postModel.find({ userId: user._id});
     res.status(200).json(post);
    
    }
    catch(error){
        console.log(error);
    }
}