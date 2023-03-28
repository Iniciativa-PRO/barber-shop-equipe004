import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();

const SECRET: any = process.env.SECRET;

function tokenUser(req: Request | any, res: Response, next: any){
    const token: any = req.headers['x-acess-token'];
    jwt.verify(token, SECRET, (err: any, decoded: any) => {
        if(err)
           return res.status(401).json({ err: 'Você não tem permissão, autentique-se novamente.' });

        req.userId = decoded.userId;

        next();
    })
}

export = tokenUser;