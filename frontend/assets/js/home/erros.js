// Trata erros de input
export function inputRequire(
    agendamento,
    inputName,
    inputTel,
    inputEmail,
    inputData,
    inputHora,
    inputServicoErro
    ) {

     let resetar = document.querySelectorAll('.input-mensagem-erros');
      
      for (let i = 0; i < resetar.length; i++) {
        resetar[i].textContent = '';
      }

      agendamento.map(input => {

        let message = document.createElement('strong');
        message.textContent = input.message;
        message.classList.add('input-mensagem-erros');

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
        }
      })

      return;
}
  