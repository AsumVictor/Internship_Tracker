import {
  retrieve_all,
  getRecordByID,
  editRecord,
  addRecord,
} from "../controller/network.controller.js";
import express from "express";
const router = express.Router();

router.get("/", retrieve_all);

router.get("/:id", getRecordByID);

router.post("/", addRecord);

router.put("/:id", editRecord);

export default router;
