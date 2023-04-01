import  Agendamento   from "./models/Agendamento.js";

let expanded = false;

export const agendamento = () => {

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

    new Agendamento(nome, email, telefone, senha, id_servico, data, hora);
  
});

const selectBox = document.getElementById('selectBox');

selectBox.addEventListener('click', () => {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.opacity = "10";
      expanded = true;
    } else {
      checkboxes.style.opacity = "0";
      expanded = false;
    }
});

}