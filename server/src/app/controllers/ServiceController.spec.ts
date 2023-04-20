import request from "supertest";
import { seedAdmin } from "./../../test/seed";
import { App } from "../../app";
const appTest = new App().server.listen(3003);

var serviceId: number;
var userId: string;
var userToken: string;


describe("Deve criar, buscar, atualizar e deletar serviço", () => {

    // Cria usuário admin
    it("Function seedAdmin", async() => {
        const user = await seedAdmin();
        expect(user);
        userId = user.id
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
        expect(res.status).toBe(201);
        serviceId = res.body.id;
    })

    it("GET / Retorna serviço", async() => {
        const res = await request(appTest)
        .get('/api/v1/services/show')
        .set('Authorization', userToken)
        expect(res.status).toBe(200);
    })

    it("PUT / Atualiza serviço", async() => {
        const res = await request(appTest).put('/api/v1/services/update')
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
        expect(res.status).toBe(200);
    })

    it("DELETE / deleta serviço", async() => {
        const res = await request(appTest).delete('/api/v1/services/delete')
        .set('Authorization', userToken)
        .send({
            id: serviceId
        })
        expect(res.status).toBe(200);
    })

    it("DELETE / deleta usuário ADMIN", async() => {
        const res = await request(appTest).delete('/api/v1/user/delete')
        .set('Authorization', userToken)
        .send({
            id: userId
        })
        expect(res.status).toBe(200);
    })
    
})