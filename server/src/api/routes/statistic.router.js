import express from "express";
import statisticControllers from "../controllers/statistic.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/user",
  authMiddleware.authIsAdmin,
  statisticControllers.userStatistics
);
router.get("/post", statisticControllers.postStatistics);

export default router;
