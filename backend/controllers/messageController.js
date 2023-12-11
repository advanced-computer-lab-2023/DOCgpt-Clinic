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
exports.getLastMessage = exports.getMsgs = exports.createMessage = void 0;
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const message_1 = __importDefault(require("../models/message"));
const conversation_1 = __importDefault(require("../models/conversation"));
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    const sender = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    console.log(token);
    const { conversationId, text } = req.body;
    //const firstusername=tokenDB?.username;
    //const secondusername=req.body;
    try {
        const Convo = yield message_1.default.create({ conversationId, sender, text });
        res.status(201).json(Convo);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createMessage = createMessage;
const getMsgs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield message_1.default.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getMsgs = getMsgs;
const getLastMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversationId = req.query.conversationId;
        // Check if the conversation exists
        const conversation = yield conversation_1.default.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        // Fetch the last message for the conversation
        const lastMessage = yield message_1.default.findOne({ conversationId }).sort({ createdAt: -1 });
        if (!lastMessage) {
            return res.status(404).json({ error: 'No messages found for the conversation' });
        }
        res.status(200).json(lastMessage);
    }
    catch (error) {
        console.error('Error fetching last message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getLastMessage = getLastMessage;
