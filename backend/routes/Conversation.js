"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversationController_1 = require("../controllers/conversationController");
const router = express_1.default.Router();
router.post('/startConv', conversationController_1.createConv);
router.get('/getConv', conversationController_1.getConv);
exports.default = router;
