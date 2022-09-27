import express from 'express';

import { getUser, registerUsers, loginUsers, updateUser, deleteUser, followUser, unFollowUser, getFriends } from '../controllers/users.js'

const router = express.Router();

router.get('/', getUser);

router.get('/friends/:userId', getFriends)

router.post('/register', registerUsers);

router.post('/login', loginUsers);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.put('/:id/follow', followUser);

router.put('/:id/unfollow', unFollowUser);

export default router;