"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommentController_1 = require("../controllers/CommentController");
const router = express_1.default.Router();
router.get('/', CommentController_1.getComments);
router.post('/add', CommentController_1.addComment);
router.post('/:commentId/update', CommentController_1.updateComment);
router.delete('/:commentId', CommentController_1.updateComment);
exports.default = router;
