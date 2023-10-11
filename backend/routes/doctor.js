"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorController_1 = require("../controllers/doctorController");
const router = (0, express_1.Router)();
router.post('/postDoctor', doctorController_1.createdoctor);
exports.default = router;
