import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/authConfig';

function tokenAdmin(req: Request, res: Response, next: NextFunction){

    try {

        const { authorization = " " } = req.headers;

        const token = authorization;

        const decoded = jwt.verify(token, authConfig.secret!) as { 
            sub: string, role: string 
        };

        req.user = { id: decoded.sub, role: decoded.role };

        if (req.user.role != "ADMIN")
            throw Error;

        next();

    } catch (err) {
        return res.status(401).json({ 
            err: 'Não autorizado.' 
        });
    }
}

export default tokenAdmin;