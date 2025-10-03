import express, { Request, Response } from "express";
import { getCoordinatesController } from "./useCases/getCoordinates/index";
import { getAllSimaController } from "./useCases/getAllSima";
import { exportCsvController } from "./useCases/exportCsv";
import { getDataByIdSimaController } from "./useCases/getDataByIdSima";
import { getDataByIdFurnasController } from "./useCases/getDataByIdFurnas";
import { getDataByIdBalcarController } from "./useCases/getDataByIdBalcar";

const router = express.Router();

router.get("/export-csv", (req: Request, res: Response) => {
  return exportCsvController.handle(req, res);
});
router.get("/get-coordinates", (req: Request, res: Response) => {
  return getCoordinatesController.handle(req, res);
});
// router.get("/sima", (req: Request, res: Response) => {
//   return getAllSimaController.handle(req, res);
// });
router.get("/sima", (req: Request, res: Response) => {
  return getDataByIdSimaController.handle(req, res);
});

router.get("/furnas/:id", (req: Request, res: Response) => {
  return getDataByIdFurnasController.handle(req, res);
});
router.get("/balcar/:id", (req: Request, res: Response) => {
  return getDataByIdBalcarController.handle(req, res);
});

export default router;
