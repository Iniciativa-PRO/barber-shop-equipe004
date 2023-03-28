import { Request, Response } from 'express';
import prisma from '../database/prisma';
import { userSessionSchema } from '../helpers/valideSession';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config();

export = {

    async login(req: Request, res: Response) {

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
          const SECRET: string | undefined = process.env.SECRET;
    
          const token = jwt.sign({
            id: user.id, role: user.role
          }, SECRET, {
            expiresIn: "3 days"
          });
    
          return res.status(200).json({ auth: true, token });
    
        } catch (err: any) {
          res.status(400).json({ err: err.message });
        };
      },
}