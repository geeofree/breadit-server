import { json, Application } from "express";
import {
  UsersController,
  UnhandledController,
  GroupsController,
} from "./controllers";

function Routes(server: Application) {
  server.use(json());
  server.use("/api/users", UsersController);
  server.use("/api/groups", GroupsController);
  server.all("*", UnhandledController);
}

export default Routes;
