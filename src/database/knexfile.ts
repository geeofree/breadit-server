import type { Knex } from "knex";
import path from "path";

const config: { [key: string]: Knex.Config } = {
  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
      extension: "ts",
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
      extension: "ts",
    },
  },

  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./dev.db",
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
      extension: "ts",
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
      extension: "ts",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
      extension: "ts",
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
      extension: "ts",
    },
  },
};

export default config;
