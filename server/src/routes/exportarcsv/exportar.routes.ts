import { Router } from "express";
import { exportPrincipaisComCampos } from "../../controllers/exportarCsv/exportarCsv";
const router = Router();

router.get("/exportar", exportPrincipaisComCampos);

export default router;
