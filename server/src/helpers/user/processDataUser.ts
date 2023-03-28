import ShortUniqueId from 'short-unique-id';
import bcrypt from 'bcryptjs';

export const generateSenha = (senha: string) => {

    const salt = bcrypt.genSaltSync(10);
    senha = bcrypt.hashSync(senha, salt);
    return senha;
 
}

export const generateId = () => {

    const generateId = new ShortUniqueId({ length: 6 });
    return generateId();

};



