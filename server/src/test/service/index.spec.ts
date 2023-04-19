import request from "supertest"
import { App } from "../../app"
const app = new App().server.listen(3001);

describe("Deve criar, buscar, atualizar e deletar serviço", () => {

    it("Cria um serviço | deve retornar não autorizado", async() => {

        const res = await request(app).post('/api/v1/services/create').send({
            tipo: 'barba',
            nome: 'Corte com Máquina',
            loja: 'Barber Shop',
            preco: '30',
            descricao: 'Corte tradicional.'
        })
        const service = res.body;
        expect(res.status).toBe(401);
        console.log(service);
    })

    it("Retorna serviços disponíveis", async() => {

        const res = await request(app).get('/api/v1/services')

        const service = res.body;
        expect(res.status).toBe(200);
        console.log(service);
    })
    
})