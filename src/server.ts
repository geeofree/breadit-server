import "dotenv/config";
import express, { Application } from "express";
import { Model } from "objection";

import knex from "./database";
import Routes from "./routes";

Model.knex(knex);

const server: Application = express();
Routes(server);

export default server;
