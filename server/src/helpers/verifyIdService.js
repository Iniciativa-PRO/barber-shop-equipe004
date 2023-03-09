let connect = [];

const verifyIdService = (id_servico) => {
    for (let i = 0; i < id_servico.length; i++) {
       connect.push({id: id_servico[i]});
    }
    return connect;  
}

module.exports = verifyIdService;

