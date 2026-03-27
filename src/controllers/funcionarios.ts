import { Request, Response } from "express"; 
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";
import {handleError} from "../helpers/handleError";
import jwt from "jsonwebtoken";
import { access } from "node:fs";



export default {
    login: async (request: Request, response: Response) => {
        try{
            const {email, senha} = request.body;

            const employees = await prisma.funcionarios.findUnique({
                where:{
                email,
                senha: bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!),
                },
            });

            if (!employees) {
                return response.status(404).json("Email e/ou senha inválidos");
            }

            const token = jwt.sign(employees, process.env.JWT_SECRET!);
            return response.status(200).json({access_token: token});

        }catch(e) {
            return handleError(e, response);
        }

    },
    list: async (request: Request, response: Response) => {
    try {
        const employees = await prisma.funcionarios.findMany();
        return response.status(200).json(employees);

    } catch (e) {
        return handleError(e, response);
    }
},

    create: async (request: Request, response: Response) => { 
        try {
            const { nome, senha, email, admin } = request.body;
            const employees = await prisma.funcionarios.create({
                data: {
                    nome,
                    email,
                    senha: bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!),
                    admin
                },
            });
            return response.status(201).json(employees);
        } catch (e) {
            return handleError(e, response);
           
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, admin, email } = request.body;
            const employees = await prisma.funcionarios.update({


                where: { id: +id },
                data: {
                    nome,
                    email,
                    admin
                },
            });
            return response.status(200).json(employees);
        } catch (e) {
            return handleError(e, response);
            
        
        }
    },
    getById: async (request: Request, response: Response) => {

        try {
            const { id } = request.params; 
            const employees = await prisma.funcionarios.findUnique({ 
                where: { 
                    id: +id 
                },
            });
            return response.status(200).json(employees) 
        } catch (e) {
            return handleError(e, response);
            
            
            }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const employees = await prisma.funcionarios.delete({
                where: {
                    id: +id
                },
            });
            return response.status(200).json(employees);

        } catch (e) {
            return handleError(e, response);
            
        }

    },


    


};