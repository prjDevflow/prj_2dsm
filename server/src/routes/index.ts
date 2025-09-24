import express from "express";
import balcar from "./balcar";
import furnas from "./furnas";
import sima from "./sima";
import exportar from "./exportarcsv";
import { getCoordinatesController } from "../controllers/getCoordinates/controller";

const router = express.Router();

// router.use("/balcar", balcar);
// router.use("/furnas", furnas);
// router.use("/sima", sima);
// router.use("/export", exportar);
router.get("/get-coordinates", getCoordinatesController);

export default router;
