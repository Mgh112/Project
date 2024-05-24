import express from "express";
import {
  addService,
  addService1,
  getServices,
  getUser,
  deleteservice
  
} from "../controllers/user.js";
import {verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

//GET
router.get("/:id", verifyUser, getUser);

//GET
router.get("/find/:id", getServices);

//PUT
router.put("/update/:id/:userid",verifyUser,addService);

//PUT
router.put("/rr/:id",addService1);

//delete
router.delete("/rr/:id",deleteservice);
export default router;
