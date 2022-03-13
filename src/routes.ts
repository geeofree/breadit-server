import { json, Application } from "express";
import { UsersController, UnhandledController } from "./controllers";

function Routes(server: Application) {
  server.use(json());
  server.use("/api/users", UsersController);
  server.all("*", UnhandledController);
}

export default Routes;
