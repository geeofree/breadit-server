import knex from "../src/database";

beforeAll(() => {
  knex.migrate.latest();
  knex.initialize();
});

afterAll(() => {
  knex.destroy();
});
