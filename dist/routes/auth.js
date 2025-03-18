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
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/register', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser) {
        res.status(400).json({ error: 'Email already registered' });
        return;
    }
    const newUser = new User_1.default({ username, email, password });
    yield newUser.save();
    const token = (0, jwt_1.generateToken)(newUser.id);
    res.status(201).json({ message: 'User registered successfully', token });
})));
router.post('/login', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const isMatch = yield user.comparePassword(password);
    if (!isMatch) {
        res.status(400).json({ error: 'Invalid credentials' });
        return;
    }
    const token = (0, jwt_1.generateToken)(user.id);
    res.status(200).json({ message: 'Login successful', token });
})));
router.post('/logout', authController_1.logout);
exports.default = router;
