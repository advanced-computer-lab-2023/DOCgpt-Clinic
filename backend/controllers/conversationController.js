"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConv = exports.createConv = void 0;
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const conversation_1 = __importDefault(require("../models/conversation"));
// create conv
const createConv = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        const firstusername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
        const secondusername = req.body.secondusername;
        // Check if a conversation already exists between the two users
        const existingConversation = await conversation_1.default.findOne({
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
        const newConvo = await conversation_1.default.create({ firstusername, secondusername });
        res.status(201).json(newConvo);
    }
    catch (error) {
        console.error("Error creating conversation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createConv = createConv;
// get convs of user
const getConv = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        const username = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
        const convos = await conversation_1.default.find({
            $or: [{ firstusername: username }, { secondusername: username }],
        });
        res.status(200).json(convos);
    }
    catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getConv = getConv;
