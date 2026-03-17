import { Router} from "express";

import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos";

const routes = Router();

routes.get("/", (request, response) => response.status(200).json({success: true}),);

routes.get("/alunos", (request, response) => alunosController.list(request, response));

routes.post("/alunos", (request, respons) => alunosController.create(request, respons));

routes.put("/alunos/:id", (request, respons) => alunosController.update(request, respons));

routes.get("/alunos/:id", (request, respons) => alunosController.getById(request, respons))

routes.delete("/alunos/:id", (request, respons) => alunosController.delete(request, respons))



routes.get("/", (request, response) => response.status(200).json({success: true}),);

routes.get("/cursos", (request, response) => cursosController.list(request, response));

routes.post("/cursos", (request, respons) => cursosController.create(request, respons));

routes.put("/cursos/:id", (request, respons) => cursosController.update(request, respons));

routes.get("/cursos/:id", (request, respons) => cursosController.getById(request, respons))

routes.delete("/cursos/:id", (request, respons) => cursosController.delete(request, respons))

export default routes;




// ou abreviar assim routes.post("/aluno", alunosController.create);
//alunosController.list(request, response),);