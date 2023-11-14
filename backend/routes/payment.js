"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paymentController_1 = require("../controllers/paymentController");
const paymentController_2 = require("../controllers/paymentController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/pay", paymentController_2.payment);
router.post("/payp", paymentController_1.payWithCredit);
exports.default = router;
