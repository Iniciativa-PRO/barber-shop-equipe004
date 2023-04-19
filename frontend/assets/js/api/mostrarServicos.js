const ajusteDeBarba = document.getElementById('ajusteDeBarba');
const cortesClassicos = document.getElementById('cortesClassicos');

async function apiServicos() {
    const data = await fetch('http://localhost:3333/api/v1/servicos');
    return await data.json();
}

async function rederServicos1() {

    const dataServicos = await apiServicos();

    dataServicos.map(servico => {

       const servicos1 = document.createElement('div');

       servicos1.innerHTML = `
        <ul class="lista-cortes">
           <li class="texto-lista">${servico.nome}</li>
           <hr size="2" width="30%" style="text-align: center; color: var(--cor-borda)" noshade>
           <li class="item-preco">R$ ${servico.preco}</li>
        </ul>`;

        return(
            ajusteDeBarba.after(servicos1)
        )
    });

}rederServicos1();

async function rederServicos2() {

    const dataServicos = await apiServicos();

    dataServicos.map(servico => {

       const servicos2 = document.createElement('div');

        servicos2.innerHTML = `<ul class="lista-cortes">
        <li class="texto-lista">${servico.nome}</li>
        <hr size="2" width="30%" style="text-align: center; color: var(--cor-borda)" noshade>
        <li class="item-preco">R$ ${servico.preco}</li>
     </ul>`;

        return(
            cortesClassicos.after(servicos2)
        )
    });

}rederServicos2();