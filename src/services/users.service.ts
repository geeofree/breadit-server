import { hash } from "bcrypt";
import { User } from "../database/models";

type NewUser = Pick<
  User,
  "unique_code" | "username" | "created_at" | "updated_at"
>;

export async function signUp(
  newUserData: Pick<User, "username" | "password">
): Promise<NewUser> {
  const { username, password } = newUserData;
  const hashedPassword = await hash(password, process.env.PW_SALT || 10);
  const newUser = await User.query().insertAndFetch({
    username,
    password: hashedPassword,
  });
  return newUser;
}
