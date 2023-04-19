import  Agendamento   from "../api/models/Agendamento.js";
import { geraSenha } from "../helpers/geraSenha.js";
import { inputRequire } from "./erros.js";

let boxMessageErro = document.querySelector('.box-msg');
let message = document.createElement('p');

export const criarAgendamento = () => {

const botaoAgendar = document.querySelector('.botao-2');

botaoAgendar.addEventListener('click', async() => {

    const inputName = document.getElementById('nome');
    const inputTel = document.getElementById('telefone');
    const inputEmail = document.getElementById('email');
    const inputServico = document.querySelectorAll('input[type="checkbox"]');
    const inputData = document.getElementById('data');
    const inputHora = document.getElementById('hora');
    // para lançar erro
    const inputServicoErro = document.getElementById('checkboxes');

    const servicos = [];

    for (let i = 0; i < inputServico.length; i++) {
      
      if (inputServico[i].checked) {
        servicos.push(parseInt(inputServico[i].id))
      }
      
    }

    let nome = inputName.value;
    let telefone = inputTel.value;  
    let email = inputEmail.value; 
    let senha = geraSenha(6);
    let id_servico = servicos;
    let data = inputData.value; 
    let hora = inputHora.value;

    const dataAgendamento = {
      nome, 
      email, 
      telefone, 
      senha, 
      id_servico, 
      data, 
      hora
    }

    const agendamento = await Agendamento.criar(dataAgendamento);
   
    if(agendamento.errors){
      return inputRequire(
        agendamento.errors,
        inputName,
        inputTel,
        inputEmail,
        inputData,
        inputHora,
        inputServicoErro
      );
    }else if(agendamento.message){
      message.classList.add('msg-erro');
      message.textContent = agendamento.message;
      boxMessageErro.appendChild(message);

      let inputErros = document.querySelectorAll('.input-mensagem-erros');
      console.log(inputErros)
      inputErros.forEach(tag => {
        return tag.textContent = '';
      })
    }else{
      message.classList.add('msg-sucesso');
      message.innerHTML = `<span>Agendamento realizado com Sucesso. Enviamos um email de confirmação e acesso ao seu perfil de usuário: <a href="mailto:${inputEmail.value}" target="_blank">Abrir Email.</a></span>`;
      boxMessageErro.appendChild(message);
    }
  
});

// Input servicos
const selectBox = document.querySelector('.input-servicos');

var expanded = true;
var expandedCount = true;

selectBox.addEventListener('click', () => {
    var checkboxes = document.getElementById("checkboxes");
    if (expanded || expandedCount) {
      checkboxes.style.opacity = "10";
      expanded = false;
    } else {
      checkboxes.style.opacity = "0";
      expanded = true;
    }
});

// Recolhe input servicos
const boxScheduling = document.querySelector('.form-agendamento');

boxScheduling.addEventListener('click', (e) => {

  const alvo = document.querySelector('.alvo');

  if(
     e.target.classList.value == 'input-servicos' || 
     e.target.type == 'checkbox'|| 
     e.target.classList.value == 'target' ||
     e.target.classList.value == 'alvo'
  ){
    if(!expanded){
      checkboxes.style.opacity = "10";
      expandedCount = false;

      alvo.classList.add('alvo-reverse');
    }
  }else{
    checkboxes.style.opacity = "0";
    expandedCount = true;
    alvo.classList.remove('alvo-reverse');
  }
});

}
