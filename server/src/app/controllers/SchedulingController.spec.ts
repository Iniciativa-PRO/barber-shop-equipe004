import request from "supertest";
import { App } from "../../app";
const appTest = new App().server.listen(3001);

var serviceId: number;
var schedulingId: string;
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

    it("POST / Cria agendamento", async() => {

        const res = await request(appTest).post('/api/v1/scheduling/create')
        .set('Authorization', userToken)
        .send({
            tipo: 'barba',
            nome: 'Corte com Máquina',
            loja: 'Barber Shop',
            preco: '30',
            descricao: 'Corte tradicional.'
        })
        expect(res.status).toBe(401);
        schedulingId = res.body.id;
    })

    it("GET / Retorna agendamento", async() => {
        const res = await request(appTest)
        .get('/api/v1/scheduling/show')
        .set('Authorization', userToken)
        expect(res.status).toBe(200);
    })

    it("PUT / Atualiza agendamento", async() => {
        const res = await request(appTest).get('/api/v1/scheduling/update')
        .set('Authorization', userToken)
        .send({
            id: schedulingId,
            tipo: 'barba',
            nome: 'Corte Com tesoura',
            loja: 'Barber Shop',
            preco: '50',
            descricao: 'Corte clássico.'
        })
        expect(res.status).toBe(200);
    })

    it("DELETE / deleta agendamento", async() => {
        const res = await request(appTest).get('/api/v1/scheduling/delete')
        .set('Authorization', userToken)
        .send({
            id: serviceId
        })
        expect(res.status).toBe(200);
    })
    
})