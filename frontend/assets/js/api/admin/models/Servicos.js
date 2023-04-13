const url = 'http://localhost:3333/api/v1/servicos';

class Servicos {


    async get() {
     
        const data = await fetch(url);
        return await data.json();

    }

}

export default Servicos;