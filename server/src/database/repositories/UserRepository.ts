import prisma from "../../lib/prisma";
import { UpdateUser, User } from "../../services/UserService";

class UserRepository {

    async create({ id, nome, email, telefone, senha }: User) {

        const userCreate = await prisma.user.create({
            data: {
                id,
                nome,
                email,
                telefone: telefone.toString(),
                senha
            },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true
            },
        });

        return userCreate;

    }

    async show(id: string) {

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                agendamento: {
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
                    },
                },
            },
        });

        return user;
    }

    async update({ id, nome, telefone, senha }: UpdateUser) {

        const userUpdate = await prisma.user.update({
            where: { id },
            data: {
                nome,
                telefone: telefone.toString(),
                senha: senha
            },
            select: {
                nome: true,
                email: true,
                telefone: true
            },
        });

        return userUpdate;
    }

    async delete(id: string) {
        await prisma.user.delete({
            where: { id },
        });
    }

    async showUsers() {

        const users = await prisma.user.findMany({
            select: {
                nome: true,
                email: true,
                telefone: true
            },
        });

        return users;
    }

}

export default new UserRepository();