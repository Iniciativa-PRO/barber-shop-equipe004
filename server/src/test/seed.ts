import { PrismaClient, Role } from '@prisma/client';
import { generateId, generateSenha } from '../helpers/user/processDataUser';
const prisma = new PrismaClient();

let senha: string = generateSenha('Dales12');
let id: string = generateId();

export async function seedAdmin() {
  const user = await prisma.user.create({
    data: {
        id,
        nome: 'Heleno Salgado',
        telefone: '12345678',
        email: 'leno@gmail.com',
        senha,
        role: Role.ADMIN
    },
    select: {
      id: true,
    }
  });
  return user;
};
seedAdmin()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    })