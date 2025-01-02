import express from 'express';
import { addComment, getCommentById, getComments, updateComment } from '../../controllers/CommentController';
import { verifyAuthentication } from '../../middleware';
const router = express.Router();

router.get('/', getComments);
router.get('/:commentId', getCommentById);
router.post('/new', verifyAuthentication, addComment);
router.post('/:commentId', verifyAuthentication, updateComment);
router.delete('/:commentId', verifyAuthentication, updateComment);

export default router;
