import { Request, Response, response } from 'express';
import prisma from './../../lib/prisma';
import { userSessionSchema } from './../../helpers/valideSession';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/authConfig';
import APIError from '../../errors/APIError';

class SessionControler {

    public async createSession(req: Request, res: Response) {

        try {
    
          const { email, senha } = userSessionSchema.parse(req.body);
    
          const user = await prisma.user.findUnique({
            where: {
              email
            },
          });
    
          if (!user)
            return res.json({ message: 'Usuário não existe.' });
    
          // Check password
          const passwordChecked = bcrypt.compareSync(senha, user.senha);
    
          if (!passwordChecked)
            return res.status(401).json({ message: 'Falha na Autenticação.' });
    
          // Permissão
          const token = jwt.sign({
            id: user.id, role: user.role
          }, authConfig.secret!, {
            expiresIn: authConfig.expiresIn
          });
    
          return res.status(200).json({ auth: true, token });
    
        } catch (err: any) {
          APIError.msg(err, res);
        };
      }
}

export default new SessionControler();