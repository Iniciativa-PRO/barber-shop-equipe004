import { PrismaClient, Role } from '@prisma/client';
import { generateId, generateSenha } from '../helpers/user/processDataUser';
const prisma = new PrismaClient();

let senha: string = generateSenha('Dales12');
let id: string = generateId();

export async function seed() {
  await prisma.user.create({
    data: {
        id,
        nome: 'Heleno Salgado',
        telefone: '12345678',
        email: 'leno@gmail.com',
        senha,
        role: Role.ADMIN
    },
  });
  await prisma.service.create({
    data: {
      id: 1,
      tipo: "barba",
      nome: "Corte com Máquina",
      loja: "Barber Shop",
      preco: "10",
      descricao: "Corte tradicional."
    }
  });
  await prisma.service.create({
    data: {
      id: 2,
      tipo: "Cabelo",
      nome: "Corte com Tesoura",
      loja: "Barber Shop",
      preco: "20",
      descricao: "Corte tradicional."
    }
  });
};
seed()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    })