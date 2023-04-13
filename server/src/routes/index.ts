import { Router } from "express";
import userRoutes from "./user.routes";
import serviceRoutes from "./service.routes";
import schedulingRoutes from "./scheduling.routes";
import sessionRoutes from "./session.routes";

const routes: Router = Router();

//Routes
routes.use("/session", sessionRoutes);
routes.use("/scheduling", schedulingRoutes);
routes.use("/user", userRoutes);
routes.use("/services", serviceRoutes);

export default routes;