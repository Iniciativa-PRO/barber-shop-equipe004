import request from "supertest";
import { App } from "../../app";
const appTest = new App().server.listen(3002);

var userId: string;
var userToken: string ;

describe("Deve criar, buscar, logar, atualizar e deletar usuário", () => {

    it("POST / Cria usuário", async() => {

        const res = await request(appTest).post('/api/v1/user/create').send({
            nome: 'Heleno Salgado',
            telefone: '12345678',
            email: 'lenotest@gmail.com',
            senha: 'Dales12'
        })
        expect(res.status).toBe(201);
        userId = res.body.id;
    })

    it("DELETE / Retorna não autorizado", async() => {
        const res = await request(appTest).delete('/api/v1/user/delete')
        .send({
            id: userId
        })
        expect(res.status).toBe(401);
    })

    it("POST / Loga usuário", async() => {
    
        const res = await request(appTest).post('/api/v1/session').send({
            email: 'lenotest@gmail.com',
            senha: 'Dales12'
        })
        expect(res.status).toBe(200);
        userToken = res.body.token;
    })

    it("GET / Retorna usuário", async() => {
        const res = await request(appTest).get('/api/v1/user/show').set('Authorization', userToken)
        .send({
            id: userId
        })
        expect(res.status).toBe(200);
    })

    it("PUT / Atualiza usuário", async() => {
        const res = await request(appTest).put('/api/v1/user/update').set('Authorization', userToken)
        .send({
            id: userId,
            nome: 'Heleno',
            telefone: '464554755',
            email: 'lenotest@gmail.com',
            senha: 'Dales12'
        })
        expect(res.status).toBe(200);
    })

    it("DELETE / Deleta usuário", async() => {
        const res = await request(appTest).delete('/api/v1/user/delete').set('Authorization', userToken)
        .send({
            id: userId
        })
        expect(res.status).toBe(200);
    })
    
})