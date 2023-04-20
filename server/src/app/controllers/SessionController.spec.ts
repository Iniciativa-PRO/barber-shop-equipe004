import request from "supertest";
import { App } from "../../app";
const appTest = new App().server.listen(3001);

var userToken: string;


describe("Deve criar sessão do usuário", () => {

    it("POST / Loga usuário", async() => {

        const res = await request(appTest).post('/api/v1/session').send({
            email: 'leno@gmail.com',
            senha: 'Dales12'
        })
        expect(res.status).toBe(200);
        userToken = res.body.token;
        console.log(userToken)
    })
})