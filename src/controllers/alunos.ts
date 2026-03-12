import {Request, Response} from "express";


export default {
    list: async (request: Request, response: Response) => {
        return response.status(200).json();
    },
}