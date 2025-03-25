import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  checkoutMomo,
  cardPay,
  paystackWebhook,
  completeAuth,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/momo", protectRoute, checkoutMomo);
router.post("/card", protectRoute, cardPay);
router.post("/complete-auth", protectRoute, completeAuth);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paystackWebhook
);



export default router;

