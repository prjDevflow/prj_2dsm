import { Router } from "express";
import { exportPrincipaisComCampos } from "../../controllers/exportarCsv/exportarCsv.ts"; 
const router = Router();

router.get("/exportar", exportPrincipaisComCampos);

export default router;
