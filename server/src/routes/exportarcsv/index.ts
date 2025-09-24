import express from "express";
import exportRoutes from "./exportar.routes";

const router = express.Router();

router.use("/export", exportRoutes);

export default router;
