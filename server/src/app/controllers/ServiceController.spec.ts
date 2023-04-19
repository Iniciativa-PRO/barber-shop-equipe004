import request from "supertest";
import appTest from "./../../test/server.spec"

var serviceId: number;
var userToken: string;


describe("Deve criar, buscar, atualizar e deletar serviço", () => {

    it("POST / Cria usuário ADMIN", async() => {

        const res = await request(appTest).post('/api/v1/user/create').send({
            nome: 'Heleno Salgado',
            telefone: '12345678',
            email: 'leno@gmail.com',
            senha: 'Dales12'
        })
        expect(res.status).toBe(201);
    })

    it("POST / Loga usuário ADMIN", async() => {
    
        const res = await request(appTest).post('/api/v1/session').send({
            email: 'leno@gmail.com',
            senha: 'Dales12'
        })
        expect(res.status).toBe(200);
        userToken = res.body.token;
    })

    it("POST / Cria serviço", async() => {

        const res = await request(appTest).post('/api/v1/services/create')
        .set('Authorization', userToken)
        .send({
            tipo: 'barba',
            nome: 'Corte com Máquina',
            loja: 'Barber Shop',
            preco: '30',
            descricao: 'Corte tradicional.'
        })
        expect(res.status).toBe(401);
        serviceId = res.body.id;
    })

    it("GET / Retorna serviço", async() => {
        const res = await request(appTest)
        .get('/api/v1/services/show')
        .set('Authorization', userToken)
        expect(res.status).toBe(200);
    })

    it("PUT / Atualiza serviço", async() => {
        const res = await request(appTest).get('/api/v1/services/update')
        .set('Authorization', userToken)
        .send({
            id: serviceId,
            tipo: 'barba',
            nome: 'Corte Com tesoura',
            loja: 'Barber Shop',
            preco: '50',
            descricao: 'Corte clássico.'
        })
        expect(res.status).toBe(200);
    })

    it("GET / Retorna todos os serviços", async() => {
        const res = await request(appTest).get('/api/v1/services')
        .set('Authorization', userToken)
        expect(res.status).toBe(200);
    })

    it("DELETE / deleta serviço", async() => {
        const res = await request(appTest).get('/api/v1/services/delete')
        .set('Authorization', userToken)
        .send({
            id: serviceId
        })
        expect(res.status).toBe(200);
    })
    
})