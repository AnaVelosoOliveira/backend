import { Router} from "express";

import alunosController from "./controllers/alunos";

const routes = Router();

routes.get("/", (request, response) => response.status(200).json({success: true}),);

routes.get("/alunos", (request, response) => alunosController.list(request, response)),;

export default routes;