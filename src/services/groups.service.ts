import { Group, User } from "../database/models";

type Username = Pick<User, "username">;
type NewGroupInput = Pick<Group, "name" | "description"> & Username;
type NewGroupOutput = Omit<Group, "id">;

export async function createGroup(
  newGroupInput: NewGroupInput
): Promise<NewGroupOutput | null> {
  const { username, ...group } = newGroupInput;
  const user = await User.query().findOne({ username });

  if (!user) return null;

  const newGroup = await user
    .$relatedQuery("groups")
    .insertAndFetch({ ...group, creator_id: user.id })
    .withGraphFetched("creator");
  newGroup.$toJson();

  return newGroup as NewGroupOutput;
}
