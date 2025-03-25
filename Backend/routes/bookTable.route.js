import express from "express";
import {
  bookTable,
  getBookedTables,
} from "../controllers/booktable.controller.js";

const router = express.Router();

router.post("/booking", bookTable);
router.get("/", getBookedTables);

export default router;
