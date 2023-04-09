import CriarAgendamento from "./api/CriarAgendamento.js";

const botaoAgendar = document.querySelector('.botao-2');

botaoAgendar.addEventListener('click', () => {

    const inputName = document.getElementById('input-name');
    const inputTel = document.getElementById('input-tel');
    const inputEmail = document.getElementById('input-email');
    const inputServico = document.getElementById('input-servicos');
    const inputData = document.getElementById('input-data');
    const inputHora = document.getElementById('input-hora');

    let nome = inputName.value;
    let telefone = parseInt(inputTel.value);  
    let email = inputEmail.value; 
    let senha = 'Ef123456'; 
    let id_servico = [9,10] 
    let data = inputData.value; 
    let hora = inputHora.value;

    new CriarAgendamento(nome, email, telefone, senha, id_servico, data, hora);
  
})