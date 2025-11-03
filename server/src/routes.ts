import express, { Request, Response } from "express";
import { getCoordinatesController } from "./useCases/getCoordinates/index";
import { getAllSimaController } from "./useCases/getAllSima";
import { exportCsvController } from "./useCases/exportCsv";
import { getDataByIdSimaController } from "./useCases/getDataByIdSima";
import { getDataByIdFurnasController } from "./useCases/getDataByIdFurnas";
import { getDataByIdBalcarController } from "./useCases/getDataByIdBalcar";
import { getDataForGraphicsController } from "./useCases/getDataForGraphics";
import { getFurnasDataController } from "./useCases/getFurnasData";


const router = express.Router();

// ⚠️WARNING: deve receber id e type(sima, balcar ou furnas)
// Ex: http://localhost:3000/export-csv?type=sima&id=1
// pode receber limit, offset(paginacao), dateInit, dateEnd(filtro)
router.get("/export-csv", (req: Request, res: Response) => {
  return exportCsvController.handle(req, res);
});
// ⚠️WARNING: deve receber um type(sima, balcar ou furnas)
// salva em cache
// http://localhost:3000/get-coordinates?type=sima // tipo banco
// http://localhost:3000/get-coordinates?type=sima&reservoir=Sul // resevatorio
// http://localhost:3333/coordinates?type=sima&institution=IBAMA // instituicao
// http://localhost:3333/coordinates?type=sima&dateInit=2024-03-01&dateEnd=2024-08-31 // periodo de tenpo
router.get("/get-coordinates", (req: Request, res: Response) => {
  return getCoordinatesController.handle(req, res);
});
// ⚠️WARNING: deve receber um type(balcar ou furnas)]
// salva em cache
// http://localhost:3000/filters?type=balcar

// pode receber limit, offset(paginacao), dateInit, dateEnd, rotulo(filtro)
// padrao limit=20 e offset=0
router.get("/sima", (req: Request, res: Response) => {
  return getAllSimaController.handle(req, res);
});
// ⚠️WARNING: devem receber rótulo
// podem receber limit, offset(paginacao), dateInit, dateEnd, rotulo(filtro)
router.get("/sima/:rotulo", (req: Request, res: Response) => {
  return getDataByIdSimaController.handle(req, res);
});


router.get("/furnas", (req: Request, res: Response) => {
  return getDataByIdFurnasController.handle(req, res);
});
router.get("/furnas/type", (req: Request, res: Response) => {
  return getFurnasDataController.handle(req, res);
});
router.get("/furnas/:id", (req: Request, res: Response) => {
  return getDataByIdFurnasController.handle(req, res);
});
router.get("/balcar/:id", (req: Request, res: Response) => {
  return getDataByIdBalcarController.handle(req, res);
});

router.get("/graphics", (req: Request, res: Response) => {
  return getDataForGraphicsController.handle(req, res);
});



export default router;
