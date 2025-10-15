import { PostgresBalcarRepository } from "../../repositories/implementations/PostgresBalcarRepository";
import { PostgresFurnasRepository } from "../../repositories/implementations/PostgresFurnasRepository";
import { GetFiltersController } from "./GetFiltersController";
import { GetFiltersUseCase } from "./GetFiltersUseCase";

const balcarRepository = new PostgresBalcarRepository()
const furnasRepository = new PostgresFurnasRepository()


const getFiltersUseCase = new GetFiltersUseCase(balcarRepository, furnasRepository)

const getFiltersController = new GetFiltersController(getFiltersUseCase)

export { getFiltersUseCase, getFiltersController}