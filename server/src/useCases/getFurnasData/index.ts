import { PostgresFurnasRepository } from "../../repositories/implementations/PostgresFurnasRepository";
import { GetFurnasDataUseCase } from "./GetFurnasDataUseCase";
import { GetFurnasDataController } from "./GetFurnasDataController";

const furnasRepository = new PostgresFurnasRepository();
const getFurnasDataUseCase = new GetFurnasDataUseCase(furnasRepository);
const getFurnasDataController = new GetFurnasDataController(getFurnasDataUseCase);

export { getFurnasDataController, getFurnasDataUseCase };