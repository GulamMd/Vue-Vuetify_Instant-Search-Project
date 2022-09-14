import express from 'express';
import { getUser, createUser, getUserWithId, deleteUser, updateUser } from '../controllers/users.js';

const router = express.Router();
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//All routes in here are starting with /users
router.get('/', getUser);

router.post('/', createUser);

router.get('/:id', getUserWithId);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;