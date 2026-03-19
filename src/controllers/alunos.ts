import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";
import { Prisma } from "../../generated/prisma/client";






export default {
    list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.alunos.findMany({
                include: {
                            matriculas: {
                                select:{
                                    cursoId: true
                                }
                            }
                        }
                }
            )

            return response.status(200).json(users);

        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                //@ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
        }
    },
    create: async (request: Request, response: Response) => {
        try {

            const { nome, idade, cpf, email, cursos } = request.body;
            const users = await prisma.alunos.create({
                data: {
                    nome,
                    idade,
                    cpf,
                    email,
                     matriculas: {
            create: cursos?.map((cursoId: number) => ({
                curso: {
                    connect: { id: cursoId }
                }
            }))
        }
                   
                },

                include:{
                    matriculas:{
                        select:{
                            cursoId: true,
                            

                        }
                        
                    }
                }

        
            });
            return response.status(201).json(users);

        } catch (e) {
            console.log(e);
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                //@ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");

        }
    },

    update: async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { nome, idade, cpf, email, cursos } = request.body;

        const users = await prisma.alunos.update({
            where: {
                id: Number(id)
            },
            data: {
                nome,
                idade,
                cpf,
                email,
            }
        });

        return response.status(200).json(users);

    } catch (e) {
        console.log(e);

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            //@ts-ignore
            return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
        }

        return response.status(500).json("Unkown error. try again later");
    }
},
    getById: async (request: Request, response: Response) => {

        try {
            const { id } = request.params;
            const user = await prisma.alunos.findUnique({
                where: {
                    id: +id

                },
                include: {
                        matriculas: true
                }

            });
            return response.status(200).json(user);

        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                //@ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
        }

    },
    delete: async (request: Request, response: Response) => {

        try {
            const { id } = request.params;

            const users = await prisma.alunos.delete({
                where: {
                    id: Number(id)
                },

            });

            return response.status(200).json(users);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                //@ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
        }




    },

    matricular: async (request: Request, response: Response) => {
    try {
        const { alunoId, cursoId } = request.body;

        const matricula = await prisma.matriculas.create({
            data: {
                alunoId,
                cursoId
            }
        });

        return response.status(201).json(matricula);

    } catch (e) {
        console.log(e);
        return response.status(500).json("Erro ao matricular");
    }
}


    


};