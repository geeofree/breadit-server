import { Knex } from "knex";
import { UsersService } from "../../services";

export async function seed(knex: Knex): Promise<void> {
  await UsersService.signUp({ username: "spider-man", password: "spider-man" });
}
