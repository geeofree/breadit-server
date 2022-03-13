import supertest from "supertest";
import server from "../../src/server";

describe("users.controller", () => {
  describe("sign-up", () => {
    it("should be able to sign-up a new user", async () => {
      const data = { username: "batman", password: "batman" };
      const { statusCode, body } = await supertest(server)
        .post("/api/users/sign-up")
        .send(data);

      expect(statusCode).toBe(201);
      expect(body.status).toBe(201);
      expect(body.message).toBe("Successfully signed-up new user.");
      expect(body.data).toEqual(
        expect.objectContaining({
          username: data.username,
          unique_code: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        })
      );
    });
  });

  describe("sign-in", () => {
    it("should be able to sign-in a user", async () => {
      const data = { username: "spider-man", password: "spider-man" };
      const { statusCode, body } = await supertest(server)
        .post("/api/users/sign-in")
        .send(data);

      expect(statusCode).toBe(200);
      expect(body.status).toBe(200);
      expect(body.message).toBe("Sign-in successful.");
      expect(body.data).toEqual(expect.any(String));
    });

    it("should return a 404 response if credentials are invalid", async () => {
      const data = { username: "doesnotexist", password: "itdoesntmatter" };
      const { statusCode, body } = await supertest(server)
        .post("/api/users/sign-in")
        .send(data);

      expect(statusCode).toBe(404);
      expect(body.status).toBe(404);
      expect(body.message).toBe(
        "Failed to sign-in. Invalid username or password. Please try again."
      );
      expect(body.data).toBeUndefined();
    });
  });
});
