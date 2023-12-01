"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConv = exports.createConv = void 0;
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const conversation_1 = __importDefault(require("../models/conversation"));
// create conv
const createConv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const firstusername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
        const secondusername = req.body.secondusername;
        // Check if a conversation already exists between the two users
        const existingConversation = yield conversation_1.default.findOne({
            $or: [
                { firstusername, secondusername },
                { firstusername: secondusername, secondusername: firstusername },
            ],
        });
        if (existingConversation) {
            // Conversation already exists, return a response indicating that
            return res.status(200).json(existingConversation);
        }
        // If no existing conversation, create a new one
        const newConvo = yield conversation_1.default.create({ firstusername, secondusername });
        res.status(201).json(newConvo);
    }
    catch (error) {
        console.error("Error creating conversation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createConv = createConv;
// get convs of user
const getConv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    const firstusername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    const convos = yield conversation_1.default.find({ firstusername: firstusername });
    res.status(201).json(convos);
});
exports.getConv = getConv;
