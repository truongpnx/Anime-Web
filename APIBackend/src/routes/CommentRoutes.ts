import express from 'express';
import { addComment, getComments, updateComment } from '../controllers/CommentController';
const router = express.Router();

router.get('/', getComments);
router.post('/add', addComment);
router.post('/:commentId/update', updateComment);
router.delete('/:commentId', updateComment);

export default router;
