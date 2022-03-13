import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("groups", (table) => {
    table.integer("id").primary().notNullable();
    table.string("unique_code").notNullable();

    table.integer("creator_id").unsigned().notNullable();
    table.foreign("creator_id").references("id").inTable("users");

    table.string("name").unique().notNullable();
    table.string("description");

    table.timestamps(true, true);
  });

  await knex.schema.createTable("group_users", (table) => {
    table.integer("user_id").unsigned().notNullable();
    table.integer("group_id").unsigned().notNullable();

    table.foreign("user_id").references("id").inTable("users");
    table.foreign("group_id").references("id").inTable("groups");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("group_users");
  await knex.schema.dropTable("groups");
}
