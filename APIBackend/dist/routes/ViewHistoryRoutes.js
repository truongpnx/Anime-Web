"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ViewHistoryController_1 = require("../controllers/ViewHistoryController");
const router = express_1.default.Router();
router.get('/', ViewHistoryController_1.getViewHistories);
router.post('/add', ViewHistoryController_1.addViewHistory);
router.post('/:historyId/update', ViewHistoryController_1.updateViewHistory);
router.delete('/:historyId', ViewHistoryController_1.deleteViewHistory);
exports.default = router;
