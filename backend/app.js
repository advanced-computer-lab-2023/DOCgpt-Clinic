"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const admin_1 = __importDefault(require("./routes/admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const patient_1 = __importDefault(require("./routes/patient"));
// Load environment variables from .env file
dotenv_1.default.config();
const mongooseUrl = (_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : 'defaultConnection';
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
//express app
app.use('/routes', admin_1.default);
app.get('/routes', admin_1.default);
app.use('/routes', patient_1.default);
app.get('/routes', patient_1.default);
// Define a POST route
app.post('/api/posts', (req, res) => {
    // Handle the POST request here
    const postData = req.body;
    // Process the postData and send a response
    res.json({ mssg: 'welcome' });
    res.json({ message: 'POST request received', data: postData });
});
mongoose_1.default.connect(mongooseUrl).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("listenining on port", process.env.PORT);
    });
})
    .catch((error) => {
    console.log(error);
});
require('dotenv').config();
;
app.get('/', (req, res) => {
    res.json(`welcome`);
});
// Start the server
;
