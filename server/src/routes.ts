import express, { Request, Response } from "express";
import { getCoordinatesController } from "./useCases/getCoordinates/index";
import { getAllSimaController } from "./useCases/getAllSima";
import { exportCsvController } from "./useCases/exportCsv";
import { getDataByIdSimaController } from "./useCases/getDataByIdSima";
import { getDataByIdFurnasController } from "./useCases/getDataByIdFurnas";
import { getDataByIdBalcarController } from "./useCases/getDataByIdBalcar";

const router = express.Router();

// deve receber id e type(sima, balcar ou furnas)
// Ex: http://localhost:3000/export-csv?type=sima&id=1
// pode receber limit, offset(paginacao), dateInit, dateEnd(filtro)
router.get("/export-csv", (req: Request, res: Response) => {
  return exportCsvController.handle(req, res);
});
// deve receber um type(sima, balcar ou furnas)
// http://localhost:3000/get-coordinates?type=sima
router.get("/get-coordinates", (req: Request, res: Response) => {
  return getCoordinatesController.handle(req, res);
});
// pode receber limit, offset(paginacao), dateInit, dateEnd, rotulo(filtro)
// padrao limit=20 e offset=0
router.get("/sima", (req: Request, res: Response) => {
  return getAllSimaController.handle(req, res);
});
// devem receber id
// podem receber limit, offset(paginacao), dateInit, dateEnd, rotulo(filtro)
router.get("/sima/:id", (req: Request, res: Response) => {
  return getDataByIdSimaController.handle(req, res);
});


router.get("/furnas", (req: Request, res: Response) => {
  return getDataByIdFurnasController.handle(req, res);
});
router.get("/furnas/:id", (req: Request, res: Response) => {
  return getDataByIdFurnasController.handle(req, res);
});
router.get("/balcar/:id", (req: Request, res: Response) => {
  return getDataByIdBalcarController.handle(req, res);
});

export default router;
