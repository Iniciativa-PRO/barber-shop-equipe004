const { object, string, size, assert, define, number } = require('superstruct');
const isEmail = require('is-email');
const ShortUniqueId = require('short-unique-id');
const bcrypt = require('bcryptjs');

const processDataUser = (nome, email, telefone, senha) => {

    if (!email)
      return res.json({ message: 'Email é obrigatório'});
    
    if (!telefone)
      return res.json({ message: 'Telefone é obrigatório'});

    if (!senha)
      return res.json({ message: 'Senha é obrigatória'});

    const User = object({
    nome: size(string(), 2, 20),
    email: define(email, isEmail),
    telefone: number(size(8, 15)),
    senha: size(string(), 6, 8)
  });

  const dataUser = { nome, email, telefone, senha }
  assert(dataUser, User)

  // Create password
  const salt = bcrypt.genSaltSync(10);
  dataUser.senha = bcrypt.hashSync(senha, salt);

  // Convert Phone Number to String
  dataUser.telefone = dataUser.telefone.toString();

  // Gerar ID
  const generate = new ShortUniqueId({ length: 6 });
  const code = String(generate()).toUpperCase();

  // Atibuir ID ao usuário
  dataUser.id = code;

  return dataUser;
}

module.exports = processDataUser;


