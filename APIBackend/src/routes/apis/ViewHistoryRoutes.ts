import express from 'express';
import {
    addViewHistory,
    deleteViewHistory,
    getViewHistories,
    getViewHistoryById,
    updateViewHistory,
} from '../../controllers/ViewHistoryController';
import { verifyAuthentication } from '../../middleware';
const router = express.Router();

router.get('/', getViewHistories);
router.get('/:id', getViewHistoryById);
router.post('/new', verifyAuthentication, addViewHistory);
router.post('/:historyId', verifyAuthentication, updateViewHistory);
router.delete('/:historyId', verifyAuthentication, deleteViewHistory);

export default router;
