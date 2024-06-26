import express from "express";
import protectRoute from "../../middlewares/protectRoute.js"
import { sendMessage } from "../../controllers/message.Controller.js";
const router = express.Router()

router.post("/:recipientId", protectRoute, sendMessage)

export default router;