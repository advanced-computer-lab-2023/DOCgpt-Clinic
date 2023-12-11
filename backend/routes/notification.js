"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationController_1 = require("../controllers/notificationController");
const router = express_1.default.Router();
router.get('/patient', notificationController_1.getNotificationsP);
router.get('/doctor', notificationController_1.getNotificationsD);
router.get('/countP', notificationController_1.getCountP);
router.get('/countD', notificationController_1.getCountD);
exports.default = router;
