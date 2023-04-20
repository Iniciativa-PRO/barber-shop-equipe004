import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

export async function main() {
  await prisma.user.create({
    data: {
        nome: 'Heleno Salgado',
        telefone: '12345678',
        email: 'leno@gmail.com',
        senha: 'Dales12',
        role: Role.ADMIN
    },
  });
};
main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
    })