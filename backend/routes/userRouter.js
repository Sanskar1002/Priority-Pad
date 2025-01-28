import { login, logout, register } from "../controller/userController.js";
import express from "express"


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

export default router;