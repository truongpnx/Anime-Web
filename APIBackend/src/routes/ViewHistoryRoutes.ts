import express from 'express';
import {
    addViewHistory,
    deleteViewHistory,
    getViewHistories,
    updateViewHistory,
} from '../controllers/ViewHistoryController';
const router = express.Router();

router.get('/', getViewHistories);
router.post('/add', addViewHistory);
router.post('/:historyId/update', updateViewHistory);
router.delete('/:historyId', deleteViewHistory);

export default router;
