import { Pojo, RelationMappings, RelationMappingsThunk } from "objection";
import { nanoid } from "nanoid";
import path from "path";
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

  static relationMappings: RelationMappings | RelationMappingsThunk = {
    groups: {
      relation: this.ManyToManyRelation,
      modelClass: path.join(__dirname, "group.model"),
      join: {
        from: "users.id",
        to: "groups.id",
        through: {
          from: "group_users.user_id",
          to: "group_users.group_id",
        },
      },
    },
  };
}

export default User;
