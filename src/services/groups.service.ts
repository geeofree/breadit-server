import { Group, User } from "../database/models";

type Username = Pick<User, "username">;
type NewGroupInput = Pick<Group, "name" | "description"> & Username;
type NewGroupOutput = Omit<Group, "id">;
type GroupWithTotalUsers = NewGroupOutput & { total_users: number };

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

export async function getGroupByGroupName(
  groupName: string
): Promise<GroupWithTotalUsers | null> {
  const group = await Group.query()
    .select(
      "name",
      "description",
      "unique_code",
      "created_at",
      "updated_at",
      Group.relatedQuery("users").count().as("total_users")
    )
    .where("name", groupName)
    .first();

  if (!group) return null;

  return group as GroupWithTotalUsers;
}

export async function groupSubscribe(
  groupName: string,
  username: string
): Promise<GroupWithTotalUsers | null> {
  const user = await User.query().findOne("username", username);

  if (!user) return null;

  const group = await Group.query().findOne("name", groupName);

  if (!group) return null;

  user.$relatedQuery("groups").relate(group);

  const currentGroup = await Group.query()
    .select(
      "name",
      "description",
      "unique_code",
      "created_at",
      "updated_at",
      Group.relatedQuery("users").count().as("total_users")
    )
    .where("name", groupName)
    .first();

  return currentGroup as GroupWithTotalUsers;
}
