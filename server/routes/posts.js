import express from 'express';

import { createPost, updatePost, deletePost, likePost, getPost, getTimeline, getUserPost } from '../controllers/posts.js';

const router = express.Router();

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

router.put('/:id/like', likePost);

router.get('/:id', getPost);

router.get('/profile/:username', getUserPost)

router.get('/timeline/:userId', getTimeline);

export default router;