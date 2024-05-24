 import express from "express";
import {
  createService,
  getService,
  getServices,
} from "../controllers/service.js";


const router = express.Router();

//post
router.post("/", createService);
//GET
router.get("/find/:id", getService);
//GET ALL
router.get("/", getServices);


export default router;
