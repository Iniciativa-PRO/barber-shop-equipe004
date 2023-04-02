import  Agendamento   from "./models/Agendamento.js";

let expanded = false;

export const agendamento = () => {

const botaoAgendar = document.querySelector('.botao-2');

// Caixa de Dialogo
const body = document.querySelector('body');
const dialogoSucess = document.createElement('span');

dialogoSucess.innerHTML = `<div class="window-dialogo-agendamento">

<h3>Obrigado, seu agendamento foi criado com sucesso 🧔🏽</h3>

<h3>Enviamos um email com dados do agendamento e login, caso queira atualizá-lo.</h3>

<strong><a href="#" target="_blank" rel="noopener noreferrer">Abrir email</a></strong>

</div>`;

botaoAgendar.addEventListener('click', async() => {

    const inputName = document.getElementById('input-name');
    const inputTel = document.getElementById('input-tel');
    const inputEmail = document.getElementById('input-email');
    const inputServico = document.querySelectorAll('input[type="checkbox"]');
    // para lançar erro
    const inputServicoErro = document.querySelector('.multiselect');
    const inputData = document.getElementById('input-data');
    const inputHora = document.getElementById('input-hora');

    const servicos = [];

    for (let i = 0; i < inputServico.length; i++) {
      
      if (inputServico[i].checked) {
        servicos.push(parseInt(inputServico[i].id))
      }
      
    }

    let nome = inputName.value;
    let telefone = parseInt(inputTel.value);  
    let email = inputEmail.value; 
    let senha = 'Ef123456'; 
    let id_servico = servicos;
    let data = inputData.value; 
    let hora = inputHora.value;

    // Trata erros de input
    function inputRequire(agendamento) {

    let resetar = document.querySelectorAll('.input-mensagem-erro');
      
      for (let i = 0; i < resetar.length; i++) {
        resetar[i].textContent = '';
      }

      // for( const item [key, item] of agendamento){
      //   console.log(item);
      // }
    
      agendamento.map(input => {

        let message = document.createElement('strong');
        message.textContent = input.message;
        message.classList.add('input-mensagem-erro');

        if (input.field == 'nome') {
          inputName.after(message);
        }

        if (input.field == 'telefone') {
          inputTel.after(message);
        }

        if (input.field == 'email') {
          inputEmail.after(message);
        }

        if (input.field == 'id_servico') {
          inputServicoErro.after(message);
        }

        if (input.field == 'data') {
          inputData.after(message);
        }

        if (input.field == 'hora') {
          inputHora.after(message);
        } else {
          inputHora.classList.add('verifySucess');
        }
      })
    }

    const dataAgendamento = {
      nome, email, telefone, senha, id_servico, data, hora
    }

    const agendamento = await Agendamento.criar(dataAgendamento);

    console.log(agendamento.errors)

    if(agendamento.errors){
      return inputRequire(agendamento.errors)
    }

    body.classList.add('ofuscar');
    body.appendChild(dialogoSucess);
  
});

// Input servicos

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