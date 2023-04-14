import express from "express";
import cors from 'cors';
import routes from "./routes";

//access-control-allow-credentials:true
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
}

export class App{

  public server: express.Application;

  constructor(){
    this.server = express();
    this.middleware();
    this.routes();
  }

  private middleware(){
    this.server.use(express.json());
    this.server.use(cors(corsOptions));
  }

  private routes(){
    this.server.use('/api/v1', routes);
  }
}