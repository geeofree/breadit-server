import { nanoid } from "nanoid";
import { Pojo, RelationMappings, RelationMappingsThunk } from "objection";
import path from "path";
import BaseModel from "./base.model";

class Group extends BaseModel {
  name!: string;
  description!: string;
  unique_code!: string;

  static tableName: string = "groups";

  $beforeInsert() {
    super.$beforeInsert();
    this.unique_code = nanoid();
  }

  $formatJson(json: Pojo): Pojo {
    const result = super.$formatJson(json);
    delete result.id;
    delete result.creator_id;
    return result;
  }

  static relationMappings: RelationMappings | RelationMappingsThunk = {
    users: {
      relation: this.ManyToManyRelation,
      modelClass: path.join(__dirname, "user.model"),
      join: {
        from: "groups.id",
        to: "users.id",
        through: {
          from: "group_users.group_id",
          to: "group_users.user_id",
        },
      },
    },
    creator: {
      relation: this.BelongsToOneRelation,
      modelClass: path.join(__dirname, "user.model"),
      join: {
        from: "groups.creator_id",
        to: "users.id",
      },
    },
  };
}

export default Group;
