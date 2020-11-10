import express from "express";
const router = express.Router();
import { protect ,admin} from "../middleware/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

router.post("/login", authUser);
router.route("/").post(registerUser).get(protect,admin,getUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
