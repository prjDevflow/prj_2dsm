import express, { Request, Response } from "express";
import { getCoordinatesController } from "../useCases/getCoordinates/index";
import { getAllSimaController } from "../useCases/getAllSima";
import { exportCsvController } from "../useCases/exportCsv";

const router = express.Router();

router.get("/export-csv", (req: Request, res: Response) => {
  return exportCsvController.handle(req, res);
});
router.get("/get-coordinates", (req: Request, res: Response) => {
  return getCoordinatesController.handle(req, res);
});
router.get("/sima", (req: Request, res: Response) => {
  return getAllSimaController.handle(req, res);
});

export default router;
