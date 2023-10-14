"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin_1 = __importDefault(require("./routes/admin"));
const patient_1 = __importDefault(require("./routes/patient"));
const app = (0, express_1.default)();
const allowedOrigin = 'http://localhost:3000';
// Load environment variables from .env file
dotenv_1.default.config();
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// Configure CORS
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    // Add other CORS configurations if needed
}));
// Express app routes
app.use('/routes', admin_1.default);
app.use('/routes', patient_1.default);
// Define a POST route
app.post('/api/posts', (req, res) => {
    // Handle the POST request here
    const postData = req.body;
    // Process the postData and send a response
    res.json({ message: 'POST request received', data: postData });
});
// Connect to MongoDB and start the server
const mongooseUrl = (_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : 'defaultConnection';
mongoose_1.default.connect(mongooseUrl)
    .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log("Listening on port", port);
    });
})
    .catch((error) => {
    console.error(error);
});
// Define a default route
app.get('/', (req, res) => {
    res.json(`Welcome`);
});
exports.default = app;
