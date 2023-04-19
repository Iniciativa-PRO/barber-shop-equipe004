import { msg } from "../constants";
import UserRepository from "../database/repositories/UserRepository";
import { generateId, generateSenha } from "../helpers/user/processDataUser";
import { userSchema } from "../helpers/user/valideUser";
import { userUpdateSchema } from "../helpers/user/valideUserUpdate";
import prisma from "../lib/prisma";

export interface User{
    id?: string;
    nome: string;
    email: string;
    telefone: string;
    senha: string
}

export interface UserUpdate{
    id: string;
    nome: string;
    telefone: string;
    senha?: string
};

class UserService {

    async create(dataUser: User) {

        const user: User = userSchema.parse(dataUser);

        const userExist = await prisma.user.findUnique({
            where: { email: user.email },
        });

        if (userExist)
            return { message: msg.userExist };

        user.id = generateId();
        user.senha = generateSenha(user.senha);

        return UserRepository.create(user);

    }

    async show(id: string){
        return UserRepository.show(id)
    }

    async update(dataUser: UserUpdate){

        const user = userUpdateSchema.parse(dataUser);

        const senhahash = generateSenha(user.senha);

        user.senha = senhahash;

        return UserRepository.update(user);
    }

    async delete(id: string){

        await UserRepository.delete(id);
        return { message: msg.sucessDeleteUser };

    }

    async showUsers(){
       return UserRepository.showUsers();
    }
}

export default new UserService()

