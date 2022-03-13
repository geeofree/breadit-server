import knex from "../src/database";

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(() => {
  knex.destroy();
});
