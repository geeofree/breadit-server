import { Pojo } from "objection";
import { nanoid } from "nanoid";
import BaseModel from "./base.model";

class User extends BaseModel {
  username!: string;
  password!: string;
  unique_code!: string;

  static tableName: string = "users";

  $beforeInsert() {
    super.$beforeInsert();
    this.unique_code = nanoid();
  }

  $formatJson(json: Pojo): Pojo {
    const result = super.$formatJson(json);
    delete result.id;
    delete result.password;
    return result;
  }
}

export default User;
