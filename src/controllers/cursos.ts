import {Request, Response} from "express";

import {prisma} from "../../config/prisma";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";
import { Prisma } from "../../generated/prisma/client";

export default {
    list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.cursos.findMany();

        return response.status(200).json(users);

        } catch (e: any) {
             if(e instanceof Prisma.PrismaClientKnownRequestError){
                //@ts-ignore
            return response.status(prismaErrorCodes[e.code] || 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
        }
    },
    create: async (request: Request, response: Response) => {
        try{
            const {nome, professor, cargaHoraria, descricao } = request.body;
        const users = await prisma.cursos.create({
            data: {
            
                nome,
                professor, 
                cargaHoraria,
                descricao, 
                
            },
        });
             return response.status(201).json(users);

        }catch (e){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                //@ts-ignore
            return response.status(prismaErrorCodes[e.code] || 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
 
        }
    },

    update: async (request: Request, response: Response) => {
        try{
             const {id} = request.params;
        const {nome, professor, cargaHoraria, descricao} = request.body;
        const users = await prisma.cursos.update({
            where: {
                id: Number(id)
            },
            data: {
                nome,
                professor, 
                cargaHoraria,
                descricao, 
            }
        });

        return response.status(200).json(users);
    } catch (e){
         if(e instanceof Prisma.PrismaClientKnownRequestError){
                //@ts-ignore
            return response.status(prismaErrorCodes[e.code] || 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
    }


        },
       

    getById: async (request: Request, response: Response) => {

        try{
            const {id } = request.params;
        const user = await prisma.cursos.findUnique({
            where:{
                id: +id
                
            }
            
        });
        return response.status(200).json(user);

        }catch(e){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                //@ts-ignore
            return response.status(prismaErrorCodes[e.code] || 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
        }
        
    },
    delete: async (request: Request, response: Response) => {

        try{
            const {id} = request.params;
      
        const users = await prisma.cursos.delete({
            where: {
                id: Number(id)
            },
        
        });

        return response.status(200).json(users);
    }catch(e){
         if(e instanceof Prisma.PrismaClientKnownRequestError){
                //@ts-ignore
            return response.status(prismaErrorCodes[e.code] || 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
    }


        }
        

};