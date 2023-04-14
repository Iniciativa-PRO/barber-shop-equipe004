import prisma from './../../lib/prisma';
import { generateId, generateSenha } from './../../helpers/user/processDataUser';
import verifyIdService from './../../helpers/service/verifyIdService';
import { Request, Response } from 'express';
import { schedulingSchema } from './../../helpers/scheduling/valideScheduling';
import { z } from 'zod';
import { schedulingUpdateSchema } from './../../helpers/scheduling/valideUpdateScheduling';
import { sendEmail } from '../../services/sendEmail';

class SchedulingController {

  public async create(req: Request, res: Response) {

    try {

      const { nome, email, telefone, senha, data, hora, id_servico } = schedulingSchema.parse(req.body);

      const senhahash = generateSenha(senha);
      const id = generateId();
      const idService = verifyIdService(id_servico);

      const userExist = await prisma.user.findUnique({
        where: { email },
      });

      if (userExist){
        return res.status(200).json({
          message: 'Usuário já existe.' 
        });
      };

      const createScheduling = await prisma.scheduling.create({
         data: {
          id,
          data,
          hora,
          servico: {
            connect: idService, 
          },
          usuario: {
            create: {
              id,
              nome,
              email,
              telefone: telefone.toString(),
              senha: senhahash
            }
          },
         },
         include: {
          servico: {
            select: {
              tipo: true,
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            },
          },
          usuario: {
            select: {
              id: true,
              nome: true,
              telefone: true,
              email: true,
            },
          },
         },
      });

      const dataEmail = {
        email, 
        senha, 
        data, 
        hora, 
        servico: createScheduling.servico
      }
      
      sendEmail(dataEmail)
      .catch(console.error);

      return res.status(201).json(createScheduling);
  
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          errors: err.errors.map(({ message, path }) => ({
            message,
            field: path.join("."),
          })),
        });
      }

      return res.status(400).json({ err: err.message });
    };
  };

  public async show(req: Request, res: Response) {
    try {
      const schedulings = await prisma.scheduling.findUnique({
        where: { usuarioId: req.body.id },
        select: {
          data: true,
          hora: true,
          servico: {
            select: {
              id: true,
              tipo: true,
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            },
          },
        },
      });
      if (!schedulings) 
         return res.status(400).json({ message: 'Sem agendamento'});

      return res.status(200).json(schedulings);

    } catch (err: any) {
      res.status(400).json({err: err.message});
    };
  };

  public async update(req: Request, res: Response) {

    try {

     const { id, data, hora, id_servico } = schedulingUpdateSchema.parse(req.body);

     const idService = verifyIdService(id_servico);

     const user = await prisma.scheduling.upsert({
      where: { usuarioId: id },
      create: {
        id,
        data,
        hora,
        servico: {
          connect: idService,
        },
        usuario: {
          connect: {
            id,
          },
        },
      },
      update: {
        data,
        hora,
        servico: {
          set: [],
          connect: idService,
        },
      },
     });
     return res.status(200).json(user);

    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          errors: err.errors.map(({ message, path }) => ({
            message,
            field: path.join("."),
          })),
        });
      }

      return res.status(400).json({ err: err.message });
    }; 
  };
 
  public async delete(req: Request, res: Response) {
    try {
      await prisma.scheduling.delete({
        where: { id: req.body.id }
      });
      return res.status(200).json({ 
        message: 'Agendamento deletado com sucesso.' 
      });

    } catch (err: any) {
      res.status(400).json({err: err.message});
    };
  };

  // Rotas administrativas
  public async schedulingsShow(req: Request, res: Response) {
    
    try {
      const scheduling = await prisma.scheduling.findMany({
        select: {
          data: true,
          hora: true,
          servico: {
            select: {
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            },
          },
          usuario: {
            select: {
              nome: true,
              telefone: true
            },
          },
        },
    });
    return res.status(200).json(scheduling);

    } catch (err: any) {
      res.status(400).json({ err: err.message });
    };
  };

  public async schedulingsSearch(req: Request, res: Response) {

    try {

      const schema = z.string({ 
        invalid_type_error: 'Deve ser uma string.' 
      }).min(8, { message: 'A data deve ter os 8 caracteres.'});

      const data = schema.parse(req.body);
    
      const schedulingSearch = await prisma.scheduling.findMany({
        where: {
          data: {
            equals: data,
          },
        },
        include: {
          servico: {
            select: {
              nome: true,
              preco: true,
            },
          },
          usuario: {
            select: {
              nome: true,
              telefone: true,
            },
          },
        },
      });
      if (schedulingSearch.length == 0)
         return res.status(400).json({ message: 'Nenhum agendamento encontrado.' });

      return res.status(200).json(schedulingSearch);

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          errors: err.errors.map(({ message, path }) => ({
            message,
            field: path.join("."),
          })),
        });
      }
      return res.status(500).json({
        message: "Internal server error",
      });
    };
  };

};

export default new SchedulingController();