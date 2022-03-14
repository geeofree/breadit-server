import { Knex } from "knex";
import { GroupsService, UsersService } from "../../services";

export async function seed(knex: Knex): Promise<void> {
  const user = await UsersService.signUp({
    username: "aris",
    password: "aris",
  });
  await GroupsService.createGroup({
    name: "atp",
    description: "chimone",
    username: user.username,
  });
}
