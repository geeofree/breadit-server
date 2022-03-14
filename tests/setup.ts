import { UsersService } from "../src/services";
import knex from "../src/database";

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
  const token = await UsersService.signIn({
    username: "spider-man",
    password: "spider-man",
  });
  process.env.JWT_TOKEN = token || "";
});

afterAll(() => {
  knex.destroy();
});
