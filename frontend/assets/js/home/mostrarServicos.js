import Servicos from "../api/admin/models/Servicos.js";

const cabelo = document.getElementById('cortesClassicos');
const barba = document.getElementById('ajusteDeBarba');

const checkboxes = document.getElementById("checkboxes");
const grupoBarba = document.createElement('div');
const grupoCabelo = document.createElement('div');
grupoBarba.innerHTML = `<strong>Ajuste de Barba</strong>`;
grupoCabelo.innerHTML = `<strong>Cortes Classicos</strong>`;

const servicos = new Servicos();

export async function rederServicos1() {

    const dataServicos = await servicos.get();

    dataServicos.map(servico => {

       const servicos = document.createElement('div');

       const input = document.createElement('input');
       const label = document.createElement('label');
       const span = document.createElement('span');

       label.for = servico.id;
       span.textContent = servico.nome;
       input.type = "checkbox";
       input.id = servico.id;

       label.appendChild(input);
       label.appendChild(span);

       //checkboxes.appendChild(label);

       if(servico.tipo == 'cabelo'){

       servicos.innerHTML = `
        <ul class="lista-cortes">
           <li class="texto-lista">${servico.nome}</li>
           <hr size="2" width="30%" style="text-align: center; color: var(--cor-borda)" noshade>
           <li class="item-preco">R$ ${servico.preco}</li>
        </ul>`;

        grupoCabelo.appendChild(label);
        cabelo.after(servicos);

       }

       if(servico.tipo == 'barba'){

        servicos.innerHTML = `
        <ul class="lista-cortes">
           <li class="texto-lista">${servico.nome}</li>
           <hr size="2" width="30%" style="text-align: center; color: var(--cor-borda)" noshade>
           <li class="item-preco">R$ ${servico.preco}</li>
        </ul>`;

        grupoBarba.appendChild(label);
        barba.after(servicos);

       }

    });

    checkboxes.appendChild(grupoCabelo);
    checkboxes.appendChild(grupoBarba);

};
