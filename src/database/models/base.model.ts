import { Model } from "objection";

class BaseModel extends Model {
  created_at!: string;
  updated_at!: string | null;

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

export default BaseModel;
