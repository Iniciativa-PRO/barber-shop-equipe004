import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET: any = process.env.SECRET;

function tokenAdmin(req: Request | any, res: Response, next: any){

    const token: any = req.headers['x-acess-token'];
    jwt.verify(token, SECRET, (err: any, decoded: any) => {
 
        if(err)
           return res.status(401).json({ err: 'Você não tem permissão, autentique-se novamente.' });

        req.user = { id: decoded.sub, role: decoded.role };

        if (req.user.role != "ADMIN")
        return res.status(401).json({ message: "Não autorizado."});

        next();
    });
}

export = tokenAdmin;