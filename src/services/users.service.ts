import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "../database/models";

type NewUser = Pick<
  User,
  "unique_code" | "username" | "created_at" | "updated_at"
>;

type UserCredentials = Pick<User, "username" | "password">;

export async function signUp(newUserData: UserCredentials): Promise<NewUser> {
  const { username, password } = newUserData;
  const hashedPassword = await hash(
    password,
    Number(process.env.SALT_ROUNDS) || 10
  );
  const newUser = await User.query().insertAndFetch({
    username,
    password: hashedPassword,
  });
  return newUser;
}

export async function signIn(
  userCredentials: UserCredentials
): Promise<string | null> {
  const { username, password } = userCredentials;
  const user = await User.query().findOne("username", username);

  if (!user) return null;

  const isCorrectPassword = await compare(password, user.password);

  if (!isCorrectPassword) return null;

  const { id: _, password: __, ...restOfUser } = user;
  const token = sign(restOfUser, process.env.JWT_SECRET || "sshhh", {
    expiresIn: process.env.JWT_EXPIRATION || "1 day",
  });

  return token;
}
