import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("users", (table) => {
    table.integer("id").primary().notNullable();
    table.string("unique_code").notNullable();

    table.string("username").notNullable().unique();
    table.string("password").notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("users");
}
