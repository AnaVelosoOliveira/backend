import {Request, Response} from "express";

import {prisma} from "../../config/prisma";
import { request } from "node:http";



export default {
    list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.alunos.findMany();

        return response.status(200).json(users);

        } catch (e: any) {
            console.error(e);
            switch(e.code){
                case "P2000": return response.status(400).json("The provided value for the column is too long for the column's type")
            }
            return response.status(500).json();
        }
    },
    create: async (request: Request, response: Response) => {
        try{
            const { nome, idade, cpf, email } = request.body;
        const users = await prisma.alunos.create({
            data: {
                nome ,
                idade ,
                cpf ,
                email 
            },
        });
             return response.status(201).json(users);

        }catch (e){
            console.error(e);
            return response.status(500).json();
           

        }
        
        
    },

    update: async (request: Request, response: Response) => {
        try{
             const {id} = request.params;
        const {nome, idade, cpf, email} = request.body;
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
    } catch (e){
        console.error(e);
        return response.status(500).json();
    }


        },
       

    getById: async (request: Request, response: Response) => {

        try{
            const {id } = request.params;
        const user = await prisma.alunos.findUnique({
            where:{
                id: +id
                
            }
            
        });
        return response.status(200).json(user);

        }catch(e){
            console.log(e);
            return response.status(200).json();
        }
        
    },
    delete: async (request: Request, response: Response) => {

        try{
            const {id} = request.params;
      
        const users = await prisma.alunos.delete({
            where: {
                id: Number(id)
            },
        
        });

        return response.status(200).json(users);
    }catch(e){
        console.log(e);
        return response.status(200).json();
    }

        }
        

};