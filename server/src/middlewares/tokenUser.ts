import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import authConfig from '../config/authConfig';

interface RequestToken extends Request{
    userId?: string;
    user?: {
      id: string;
      role: string;
    };
}

function tokenUser(req: RequestToken, res: Response, next: NextFunction){

    try {

        const { authorization = " " } = req.headers;

        const token = authorization;

        const decoded = jwt.verify(token, authConfig.secret!) as { userId: string};
       
        req.userId = decoded.userId;

        next();

    } catch (err) {
        return res.status(401).json({ 
            err: 'Não autorizado.' 
        });
    }

    
}

export default tokenUser;