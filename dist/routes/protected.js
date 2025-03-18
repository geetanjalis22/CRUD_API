"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get('/dashboard', auth_1.default, (req, res, next) => {
    if (!req.user) {
        res.status(403).json({ error: 'Unauthorized access' });
        return;
    }
    res.json({ message: `Welcome to the dashboard, ${req.user.id}` });
});
exports.default = router;
