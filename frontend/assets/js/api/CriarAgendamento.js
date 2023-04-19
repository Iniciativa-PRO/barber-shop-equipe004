const url = 'http://localhost:3333/api/v1/agendamento/criar';

export default class CriarAgendamento {

    constructor(nome, email, telefone, senha, id_servico, data, hora) {


        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
        this.id_servico = id_servico;
        this.data = data;
        this.hora = hora;

        const dataAgendamento = {
            nome, email, telefone, senha, id_servico, data, hora
        }

        this.set(dataAgendamento);

    }

    async set(data) {
     
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((err) => console.log(err.message));

        return

    }

}

