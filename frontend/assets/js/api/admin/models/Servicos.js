const url = 'http://localhost:3000/api/v1/services';

class Servicos {


    async get() {
     
        const data = await fetch(url);
        return await data.json();

    }

}

export default Servicos;