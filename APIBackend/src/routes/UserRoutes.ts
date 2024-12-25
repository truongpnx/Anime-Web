import express from 'express';
import { deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/UserController';
import { verifyAuthentication } from '../middleware';
import viewHistoryRoutes from './ViewHistoryRoutes';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/:id', verifyAuthentication, updateUserById);
router.delete('/:id', verifyAuthentication, deleteUserById);

router.use('/:userId/histories', viewHistoryRoutes);

export default router;
