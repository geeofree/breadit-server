import { Knex } from "knex";
import { UsersService } from "../../services";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();
  await UsersService.signUp({ username: "spider-man", password: "spider-man" });
}
