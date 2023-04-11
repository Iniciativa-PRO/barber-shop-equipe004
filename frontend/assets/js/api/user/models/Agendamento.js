const BaseUrl = 'http://localhost:3333/api/v1/agendamento';



class Agendamento {

    static async criar(data) {

        const agendamento = await fetch(`${BaseUrl}/criar`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }, 
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => error)

        return agendamento;
        
    }

}


export default Agendamento;
